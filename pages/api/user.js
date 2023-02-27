import { db } from "../../firebase";
import {setDoc, collection,addDoc,updateDoc,doc,deleteDoc,documentId, serverTimestamp } from "firebase/firestore";
const addUser = async ({ userId, userEmail, userPhoto, title,des,sub,notf,time,tags,price,cat,name,url }) => {
  const docRef = await addDoc(collection(db, "Gigs"), {
    user: userId,
    emailId: userEmail,
    name:name,
    pic:userPhoto,
    title:title,
    category:cat,
    subject:sub,
    description: des,
    notification: notf,
    timeDuration:time,
    benefitTags:tags,
    price:price,
    thumbnail:url,
    createdAt: new Date().getTime()
  });
}


const createUserInFirestore = async ({uid,name,email,photoUrl}) => {
  const docRef =  await setDoc(doc(db, "users", uid), {
    userId:uid,
    displayName: name,
    email:email,
    photoURL:photoUrl,
    lastSceen:serverTimestamp(),
  },{merge:true});
   
    
}; 
export {addUser , createUserInFirestore}