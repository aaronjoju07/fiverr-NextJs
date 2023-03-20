import { Box, HStack, Divider, Stack, Text, VStack, Heading } from '@chakra-ui/react'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AddGig from '../components/AddGig'
import DisplayGig from '../components/DisplayGig'
import AddProject from '../components/Project/AddProject'
import DisplayProject from '../components/Project/DisplayProject'
import { auth, db } from '../firebase'


const addGig = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = React.useState([]);
  const [prj, setPrj] = React.useState([]);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    const q = query(collection(db, "Gigs"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {

      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
  const projectData = () => {
    if (!user) {
      setPrj([]);
      return;
    }

    const q = query(collection(db, "PostProject"), where("postedUser", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {

      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setPrj(ar);
    });
  };
  useEffect(() => {
    refreshData();
    projectData()
  }, [user]);
  console.log(prj)
  return (

    <>
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">
        </script>
      </Head>
<Box>

      <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}><Heading as='h2' size='xl'>Gig</Heading></Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>{todos.length > 0 ? (null) : (<AddGig todo={todos} />)} </Box>
      <Box  p={5}  display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}>
        {todos && todos.map((todo) => (
          <DisplayGig key={todo.id} gig={todo} />
        ))}
      </Box>
      <Divider />
      {prj && <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}><Heading as='h2' size='xl'>Project</Heading></Box>}
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}><AddProject /></Box>
      <VStack alignItems={'center'} p={5}>
        {prj && prj.map((prje) => (
          <DisplayProject key={prje.id} prj={prje} />
        ))}
      </VStack>
</Box>
    </>

  )
}

export default addGig
