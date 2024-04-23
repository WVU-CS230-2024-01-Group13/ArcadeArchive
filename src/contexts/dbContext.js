//import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase';
import { ref, set } from 'firebase/database'; 
import { auth} from '../firebase'


    //dbSignup function to input user data into the firebase realtime database
    export function dbSignup  (email, username)  {
        try {
            const user =auth.currentUser; 
           
            const user_data = {  // user's info
                email: email,
                username: username,
                last_login: Date.now(),
            };
            const usersRef = ref(db, 'users/' + user.uid);
             set(usersRef, user_data); 
            console.log('User data saved successfully');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
  
   

}