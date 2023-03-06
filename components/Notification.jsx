import { BellIcon } from '@chakra-ui/icons'
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const Notification = () => {
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
  console.log(notf)
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
        <PopoverHeader>Confirmation!</PopoverHeader>{notf && notf.map((notfication) => {
          if (notfication.projectaReqStatus == false) {return(
            <PopoverBody>You have recieved a {notfication.category} project request from {notfication.reqUser}.</PopoverBody>
          )}
        })
        }
      </PopoverContent>
    </Popover>
  )
}

export default Notification
