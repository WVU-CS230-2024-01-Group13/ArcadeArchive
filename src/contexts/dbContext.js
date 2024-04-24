//import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase';
import { ref, set, remove, get} from 'firebase/database'; 
import { auth} from '../firebase'


    //dbSignup function to input user data into the firebase realtime database
    export function dbSignup  (email, username)  {
        try {
            const user =auth.currentUser; 
           
            const user_data = {  // user's info
                email: email,
                username: username,
                last_login: Date.now(),
                following: "",
                followers: ""
            };
            const usersRef = ref(db, 'users/' + user.uid);
             set(usersRef, user_data); 
            console.log('User data saved successfully');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
  
   

}

export async function follow(toUsername) {
    try {
        const sender = auth.currentUser;
        const usersRef = ref(db, 'users');

        const snapshot = await get(usersRef); // Get all users
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.username === toUsername) { // Check if username matches
                const userId = childSnapshot.key;
                console.log("User ID:", userId);
                const followingRef = ref(db, 'users/' + sender.uid + '/following/' + userId);
                const followersRef = ref(db, 'users/' + userId + '/followers/' + sender.uid);
                set(followingRef, true);
                set(followersRef, true);
            }
        });
    } catch (error) {
        console.error("Error following user:", error);
    }
}

export async function unfollow(toUsername) {
    try {
        const sender = auth.currentUser;
        const usersRef = ref(db, 'users');

        const snapshot = await get(usersRef); // Get all users
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.username === toUsername) { // Check if username matches
                const userId = childSnapshot.key;
                console.log("User ID:", userId);
                const followingRef = ref(db, 'users/' + sender.uid + '/following/' + userId);
                const followersRef = ref(db, 'users/' + userId + '/followers/' + sender.uid);
                remove(followingRef);
                remove(followersRef);
            }
        });
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
}
