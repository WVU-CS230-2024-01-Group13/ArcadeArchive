import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getDatabase } from 'firebase/database';

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2R8066aBNkqCYljLoVPYzq1HEhn-RvyE",
  authDomain: "group-13-cs230-spring-2024.firebaseapp.com",
  databaseURL: "https://group-13-cs230-spring-2024-default-rtdb.firebaseio.com",
  projectId: "group-13-cs230-spring-2024",
  storageBucket: "group-13-cs230-spring-2024.appspot.com",
  messagingSenderId: "217702472604",
  appId: "1:217702472604:web:0e13be0ce09d68a3d50659",
  measurementId: "G-SQ2V1VWEH0"
});



export const auth = app.auth()
export const db= getDatabase(app)
export default app