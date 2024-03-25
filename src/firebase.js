// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2R8066aBNkqCYljLoVPYzq1HEhn-RvyE",
  authDomain: "group-13-cs230-spring-2024.firebaseapp.com",
  databaseURL: "https://group-13-cs230-spring-2024-default-rtdb.firebaseio.com",
  projectId: "group-13-cs230-spring-2024",
  storageBucket: "group-13-cs230-spring-2024.appspot.com",
  messagingSenderId: "217702472604",
  appId: "1:217702472604:web:0e13be0ce09d68a3d50659",
  measurementId: "G-SQ2V1VWEH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;