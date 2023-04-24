import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIqe1M8zt2aFO1oecvrf2FtCQIo8n7yJ0",
  authDomain: "twitter-1da38.firebaseapp.com",
  databaseURL: "https://twitter-1da38-default-rtdb.firebaseio.com",
  projectId: "twitter-1da38",
  storageBucket: "twitter-1da38.appspot.com",
  messagingSenderId: "53024637179",
  appId: "1:53024637179:web:9170c72c645ec02420705e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {app, auth, db , storage };