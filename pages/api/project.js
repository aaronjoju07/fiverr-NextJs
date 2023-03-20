import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const addProject = async ({id,reqUser,gigUser,projectaReqStatus,gigPrice,promisedTime,timeFact,category,sug}) => {
    const docRef =  await setDoc(doc(db, "project", id), {
        pid:id,
        reqUser,
         gigUser,
        projectaReqStatus,
        gigPrice,
        promisedTime,
        timeFlex:timeFact,
        category,
        sug,
        status:"Initial",
        progress:0,
        payment:false,
      reqTime:serverTimestamp(),
    });   
  }; 
  const createStatus = async ({id}) => {
    const docRef =  await addDoc(collection(db, `project/${id}/status`), {
      status:"Initial",
      reqTime:serverTimestamp(),
    });   
  }; 
  const updateStatusTracker = async ({id,status}) => {
    const docRef =  await addDoc(collection(db, `project/${id}/status`), {
      status,
      reqTime:serverTimestamp(),
    });   
  }; 
  const updateState = async ({id,status}) =>{
     let progress = 0
    if (status == 'Initial') {
      progress =0
    } else if(status == 'Phase1'){
      progress =10
    }else if(status == 'Phase 1 Processing'){
      progress =20
    }
    else if(status == 'Phase 1 Completed'){
      progress =30
    }
    else if(status == 'Phase2'){
      progress =40
    }
    else if(status == 'Phase 2 Processing'){
      progress =50
    }
    else if(status == 'Phase 2 Completed'){
      progress =60
    }
    else if(status == 'Phase3'){
      progress =70
    }
    else if(status == 'Phase 3 Processing'){
      progress =80
    }
    else if(status == 'Phase 3 Completed'){
      progress =90
    }
    else if(status == 'Completed'){
      progress =100
    }
    else{
      progress=0}
    try {
       const todoRef = doc(db,"project",id)
       await updateDoc(todoRef,{
        status,
        progress:progress,
        update:serverTimestamp()
       })
    } catch (error) {
        console.log(error)
    }
  }
   
    
export {addProject,createStatus,updateState,updateStatusTracker}