import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/layout";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore";
import { db,auth } from "../../firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
  const router = useRouter();

  
  const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))
  
  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && (input != user.email) && (input.length() > 0)) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }
  
  const chatList = () => {
    return (
      chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => 
        <Flex key={chat.id}
           p={3}
            align="center"
            _hover={{bg: "gray.100", cursor: "pointer"}} 
            onClick={() => redirect(chat.id)}>
            <Avatar src="" marginEnd={3} />
            <Text>{getOtherEmail(chat.users, user)}</Text>
          </Flex>
      )
      )
    }
    
    const redirect = (id) => {
      router.push(`/chats/${id}`);
    }
  return (
    <Flex
      // bg="blue.100"
      h="100%"
      w="300px"
      borderEnd="1px solid" borderColor="gray.200"
      direction="column"
    >
      <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

      <Flex overflowX="scroll" direction="column" sx={{scrollbarWidth: "none"}} flex={1} >
        {chatList()}
      </Flex>

    </Flex>

  )
}