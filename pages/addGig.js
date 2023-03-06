import { Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AddGig from '../components/AddGig'
import DisplayGig from '../components/DisplayGig'
import { auth, db } from '../firebase'

const addGig = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = React.useState([]);
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
  useEffect(() => {
    refreshData();
  }, [user]);
  return (

    <>
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">
        </script>
      </Head>

      <Stack>
        {todos.length > 0 ? (null) : (<AddGig todo={todos} />)}

        <Box display='flex'
          justifyContent='center'        >
          {todos && todos.map((todo) => (
            <DisplayGig key={todo.id} gig={todo} />
          ))}
        </Box>
      </Stack>
    </>

  )
}

export default addGig
