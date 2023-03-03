import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import {  auth, db } from '../firebase';


const projects = () => {
  const [user] = useAuthState(auth);
  const [gigs,setGigs] = useState()
  const userId = user.uid
  async function calldata(){
    const q = query(collection(db, "Gigs"), where("user", "!=", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setGigs(doc.data())
    });
  }
  console.log(gigs)
  return (
    <Box display='flex'
            justifyContent='center'
    >
        <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Your Projects</Tab>
    <Tab>Requests</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
  )
}

export default projects
