import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACzUMxYWlhdUeeFMO_c-MtqzJ2jBWR1DI",
  authDomain: "application-1-f4cd6.firebaseapp.com",
  projectId: "application-1-f4cd6",
  storageBucket: "application-1-f4cd6.appspot.com",
  messagingSenderId: "186308642213",
  appId: "1:186308642213:web:1acb1cd09db24ba919544c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {app, auth, db , storage };