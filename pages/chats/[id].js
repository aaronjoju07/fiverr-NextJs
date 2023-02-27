import { Flex, Text } from "@chakra-ui/layout"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, orderBy, query } from "firebase/firestore"
import { db, auth } from "../../firebase"
import getOtherEmail from "../../utils/getOtherEmail"
import { useRef, useEffect } from "react";
import Sidebar from "../../components/Chat/Sidebar";
import Topbar from "../../components/Chat/Topbar";
import Bottombar from "../../components/Chat/Bottombar";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map(msg => {
      const sender = msg.sender === user.email;
      return (
        <Flex key={msg.id} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
          <Text>{msg.text}</Text>
        </Flex>
      )
    })

    // useEffect(() => {
    //   const scrollBottom = () => {
    //     bottomOfChat.current.scrollIntoView({
    //       behavior: "smooth",
    //       block: 'start',
    //     });
    //   };
    //   setTimeout(scrollBottom, 10);
    // }, [messages]);

  return (
    <Flex
      h="85vh"
    >
      <Head><title>Chat App</title></Head>

      <Sidebar />

      <Flex flex={1} direction="column" w="90vh">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex flex={1} direction="column" pt={4} mx={5} overflowX="scroll" sx={{scrollbarWidth: "none"}}>
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar id={id} user={user} />
      </Flex>

    </Flex>

  )
}