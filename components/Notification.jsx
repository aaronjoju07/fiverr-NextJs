import { BellIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, useToast } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { createStatus } from '../pages/api/project';
import { deleteTodo, toggleTodoStatus } from '../pages/api/user';

const Notification = () => {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const [notf, setTodos] = useState([]);
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "project"), where("gigUser", "==", user.email));

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
  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna reject this request?")) {
      deleteTodo({id});
      toast({ title: "Rejected", status: "warning" });
    }
  };
  const handleToggle = async (id) => {
    await toggleTodoStatus({id});
    await createStatus({id})
    toast({
      title: `Project accepted`,
      status: "success" 
    });
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notification!</PopoverHeader>{notf && notf.map((notfication) => {
          if (notfication.projectaReqStatus == false) {return(
            <PopoverBody>
            You have recieved a {notfication.category} project request from {notfication.reqUser}.
            <ButtonGroup><Button size={'sm'} colorScheme='red'  onClick={() => handleTodoDelete(notfication.pid)}>Reject</Button>
            <Button size={'sm'} colorScheme='whatsapp'  onClick={() => handleToggle(notfication.pid)}>Approve</Button></ButtonGroup>
            </PopoverBody>
          )}
        })
        }
      </PopoverContent>
    </Popover>
  )
}

export default Notification
