import { addDoc, collection, deleteDoc, doc, Firestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const createProject = async ({ title, estPrice, category, desc, postedUser,PostUserEmail,PostUserPic }) => {
    const docRef = await addDoc(collection(db, "PostProject"), {
        title, estPrice, category, desc, postedUser,approved:false,PostUserEmail,PostUserPic,
        postTime: serverTimestamp(),
    });
}; 
const BidProject = async ({  estPrice, desc, postedUser,postedEmail,postedUserPic,prjid }) => {
    const docRef =  await setDoc(doc(db, `PostProject/${prjid}/Bid`, postedUser), {
         estPrice, desc, postedUser,postedEmail,postedUserPic,
        postTime: serverTimestamp(),
    });
}; 

const deleteProject = async ({id}) => {
    try {
      const todoRef = doc(db, "PostProject", id);
      await deleteDoc(todoRef);
    } catch (err) {
      console.log(err);
    }
  };

  
export { createProject,BidProject ,deleteProject }