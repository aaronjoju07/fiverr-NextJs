import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Avatar,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { BidApprove, addProjectBid, deleteBid } from '../api/project';
const bids = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [prjs, setPrj] = useState([]);
  const [pr, setPr] = useState([]);
  const { id } = router.query;
  const projectData = () => {
    if (!user) {
      setPrj([]);
      return;
    }

    const q = query(collection(db, `PostProject/${id}/Bid`));

    onSnapshot(q, (querySnapchot) => {

      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setPrj(ar);
    });
  };
  const prjDat =async () => {
    if (!user) {
      setPr([]);
      return;
    }

    const docRef = doc(db, "PostProject", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPr(docSnap.data())
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  console.log(pr)
  useEffect(() => {
    projectData()
    prjDat()
  }, [user]);

  function clickok(biderEmail,biderId,biderPic,bidId,BidAmt,desc){
    const data={
      biderEmail,biderId,biderPic,bidId,BidAmt
    }
    BidApprove(data)
    const ProjectData={
      BidUser:biderEmail,
      User:user.email,
      Price:BidAmt,
      category:pr.category,
      sug:desc,
      title:pr.title
    }
    addProjectBid(ProjectData)
  }

  function Deleteok(pid,id) {
    const data ={
      pid,id
    }
    console.log(data)
    deleteBid(data)
  }
  return (
    <>
      <Heading
      p={7}
      
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'80%'}>
           {/* {pr.title} <br /> */}
            <Text as={'span'} color={'green.400'}>
            {pr.title}
            </Text>
            <Text color={'gray.500'}>
            {pr.category}
          </Text>
          </Heading>
      <Box>
      {/* {pr.PostUserEmail}{pr.postedUser} */}
        <TableContainer p={1}>
          <Table variant='simple'>
            {/* <TableCaption>I</TableCaption> */}
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Description</Th>
                <Th isNumeric>Price</Th>
                {!pr.approved && <Th></Th>}
              </Tr>
            </Thead>
            <Tbody>
              {prjs && prjs.map((prj) => (
                <Tr key={prj.id}>
                  <Td display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}><Avatar name={prj.postedEmail} src={prj.postedUserPic} />{prj.postedEmail}</Td>
                  <Td>{prj.desc}</Td>
                  <Td isNumeric>₹{prj.estPrice}</Td>
                  <Td><ButtonGroup>
                  {(!pr.approved && pr.postedUser == user.uid) && <Button variant={'ghost'} onClick={()=>clickok(prj.postedEmail,prj.postedUser,prj.postedUserPic,id,prj.estPrice,prj.desc)} ><CheckIcon color={'green.300'} /></Button>}
                  {(!pr.approved && prj.postedUser == user.uid) &&<Button variant={'ghost'} onClick={()=>Deleteok(id,prj.id)}><DeleteIcon color={'red.200'} /></Button>}
                  </ButtonGroup></Td>
                </Tr>
      ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default bids
