// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPlY-v_w87njZjnrB2QFWCOTLSrr_mJPU",
  authDomain: "fir-task-120be.firebaseapp.com",
  projectId: "fir-task-120be",
  storageBucket: "fir-task-120be.appspot.com",
  messagingSenderId: "565687497918",
  appId: "1:565687497918:web:0e36eeeaf862dfe916daef",
  measurementId: "G-5R25WNH8J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();