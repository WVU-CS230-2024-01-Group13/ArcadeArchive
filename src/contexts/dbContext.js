//import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase';
import { ref, set, get } from 'firebase/database'; 
import { auth } from '../firebase'

async function isUsernameTaken(username) {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        const users = snapshot.val();
        return Object.values(users).some(user => user.username === username);
    }
    return false;
}

    //dbSignup function to input user data into the firebase realtime database
    export async function dbSignup  (email, username)  {
        try {
            const user =auth.currentUser; 

             // Check if username is already taken
            const usernameTaken = await isUsernameTaken(username);
            if (usernameTaken) {
                throw new Error('Username is already taken');
            }
           
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