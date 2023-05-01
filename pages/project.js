import { VStack } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DisplayProject from "../components/Project/DisplayProject";
import { auth, db } from "../firebase";
import HeroProject from "../components/HeroProject";

const project = () => {
  const [user] = useAuthState(auth);
  const [prj, setPrj] = useState([]);
  const projectData = () => {
    if (!user) {
      setPrj([]);
      return;
    }

    const q = query(collection(db, "PostProject"), where("postedUser", "!=", user.uid) && where("approved","==",false));

    onSnapshot(q, (querySnapchot) => {

      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setPrj(ar);
    });
  };
  useEffect(() => {
    projectData()
  }, [user]);
  console.log(prj)
  return (
    <>
    <Head>
        <title>Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/123.svg" />
      </Head>
    <VStack alignItems={'center'} p={5}>
    <HeroProject />
        {prj && prj.map((prje) => (
          <DisplayProject key={prje.id} prj={prje} />
        ))}
      </VStack>
    </>

  )
}

export default project

