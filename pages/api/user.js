import { db } from "../../firebase";
import {setDoc, collection,addDoc,updateDoc,doc,deleteDoc,documentId } from "firebase/firestore";
const addUser = async ({ userId, userEmail, fname, nickname,des,skill,pnom,country }) => {
    const docRef = await setDoc(doc(db, "userDb", userEmail), {
      user: userId,
      emailId: userEmail,
      fullName:fname,
      nickName:nickname,
      description: des,
      skills: skill,
      phoneNumber:pnom,
      country:country,
      createdAt: new Date().getTime()
    });
}

export {addUser}