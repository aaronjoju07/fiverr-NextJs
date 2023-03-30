import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
const bids = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [prjs, setPrj] = useState([]);
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
  console.log(prjs)
  useEffect(() => {
    projectData()
  }, [user]);

  function clickok(){

  }

  function Deleteok() {
    
  }
  return (
    <>
      <Box>
        <TableContainer p={14}>
          <Table variant='simple'>
            {/* <TableCaption>I</TableCaption> */}
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Description</Th>
                <Th isNumeric>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {prjs && prjs.map((prj) => (
                <Tr key={prj.id}>
                  <Td display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}><Avatar name={prj.postedEmail} src={prj.postedUserPic} />{prj.postedEmail}</Td>
                  <Td>{prj.desc}</Td>
                  <Td isNumeric>₹{prj.estPrice}</Td>
                  <Td><ButtonGroup>
                    <Button variant={'ghost'} onClick={()=>clickok()} ><CheckIcon color={'green.300'} /></Button>
                    <Button variant={'ghost'} onClick={()=>Deleteok()}><DeleteIcon color={'red.200'} /></Button>
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
