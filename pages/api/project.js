import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const addProject = async ({id,reqUser,gigUser,projectaReqStatus,gigPrice,promisedTime,timeFact,category}) => {
    const docRef =  await setDoc(doc(db, "project", id), {
        pid:id,
        reqUser,
         gigUser,
        projectaReqStatus,
        gigPrice,
        promisedTime,
        timeFlex:timeFact,
        category,
      reqTime:serverTimestamp(),
    });   
  }; 
export {addProject}