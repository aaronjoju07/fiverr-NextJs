import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
  } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ApprovedOrders = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "project"), where("reqUser", "==", user.email));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
console.log(todos)
  useEffect(() => {
    refreshData();
  }, [user]);
  return (
    <div>
      {todos ? (todos.map((prj)=>{
        <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                         {prj.category} | {prj.gigUser}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Project reqTime : {prj.reqTime},
                    current status :  <CircularProgress size='40px' value={prj.progress} color='green.400'><CircularProgressLabel>{prj.progress}%</CircularProgressLabel></CircularProgress>,
                    Last Updated On : {prj.update}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
      })):null}
    </div>
  )
}

export default ApprovedOrders

