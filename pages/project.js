import { VStack } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DisplayProject from "../components/Project/DisplayProject";
import { auth, db } from "../firebase";

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
    <VStack alignItems={'center'} p={5}>
        {prj && prj.map((prje) => (
          <DisplayProject key={prje.id} prj={prje} />
        ))}
      </VStack>
    </>

  )
}

export default project

