import React, { Fragment, useEffect, useState } from 'react';
import {
  Container,
  Flex,
  Stack,
  VStack,
  useColorModeValue,
  Avatar,
  Text,
  Button,
  useToast,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { GoPrimitiveDot } from 'react-icons/go';
import { DeleteIcon } from '@chakra-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import Bid from './Bid';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { deleteProject } from '../../pages/api/projects';


const DisplayProject = ({ prj }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  function DeleteProject(id) {
    deleteProject({id})
    toast({ title: "Deleted", status: "error" });
  }
  const router = useRouter();
  function ClickFun(id,uman) {
    router.push(`/projectBids/${id}`);
    if(uman==user.uid){
      
    }
  }
  const [user] = useAuthState(auth);
  const [ddo, setDoo] = useState()
  async function BidButton() {
    const docRef = doc(db, `PostProject/${prj.id}/Bid`, user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDoo(true)
    } else {
      setDoo(false)
    }
  }
  useEffect(() => {
    BidButton()
  }, [user]); 
  return (
    <Container maxW="5xl" p={{ base: 5, md: 1 }}>
      <VStack
        boxShadow={useColorModeValue(
          '2px 6px 8px rgba(160, 174, 192, 0.6)',
          '2px 6px 8px rgba(9, 17, 28, 0.9)'
        )}
        bg={useColorModeValue('gray.100', 'gray.800')}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        <Fragment key={prj.id}>
          <Flex
            w="100%"
            justify="space-between"
            alignItems="center"
            _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
          >
            <Stack onClick={() => ClickFun(prj.id,prj.postedUser)} spacing={0} direction="row" alignItems="center">
              <Flex p={4}>
                <Avatar  size="md" name={prj.title} src={'/graphic&design.png'} />
              </Flex>
              <Flex direction="column" p={2}>
                <Text
                  color={useColorModeValue('black', 'white')}
                  fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                  as={"b"}
                // dangerouslySetInnerHTML={{ __html: prj.title}}
                >{prj.title} - {prj.category} </Text>
                <Box display={'flex'}>
                {prj.PostUserEmail && (<Avatar p={3} size={"xs"} name={prj.PostUserEmail} src={prj.postedUserPic} />)}
                {prj.PostUserEmail && <Text>{prj.PostUserEmail}</Text>}
                </Box>
                <Text>About : {prj.desc}</Text><Text> ₹{prj.estPrice}</Text>
                <Text
                  color={useColorModeValue('gray.400', 'gray.200')}
                  fontSize={{ base: 'sm', sm: 'md' }}
                >
                  {prj && prj.postTime ? prj.postTime.toDate().toLocaleDateString() : null}
                </Text>
              </Flex>
            </Stack>
            <Flex p={4}>
              {prj.postedUser == user.uid && <Button onClick={() => DeleteProject(prj.id)} variant={'ghost'} _hover={{ bg: "gray.100" }}><DeleteIcon /></Button>}
              {(prj.postedUser != user.uid && !ddo) && <Button onClick={onOpen} variant={'ghost'} _hover={{ bg: "gray.100" }}><Bid prjid={prj.id} /></Button>}
            </Flex>
          </Flex>
        </Fragment>
      </VStack>
    </Container>
  )
}
export default DisplayProject