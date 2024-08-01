// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYgyOqpxCGbd6HlZr7YnmaNCVEDUnqADo",
  authDomain: "miniblog-2ca69.firebaseapp.com",
  projectId: "miniblog-2ca69",
  storageBucket: "miniblog-2ca69.appspot.com",
  messagingSenderId: "753417633486",
  appId: "1:753417633486:web:b165142282eda4f947da9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


export {db,app}