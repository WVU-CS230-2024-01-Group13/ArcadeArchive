//import React, { useContext, useState, useEffect } from 'react'
import { push, ref, set, remove, get} from 'firebase/database';
import { db, auth } from '../firebase';

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

        const snapshot = await get(usersRef);
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.username === toUsername) {
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

        const snapshot = await get(usersRef);
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.username === toUsername) {
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

export async function uploadGame(title, description, thumbnailUrl, pythonUrl, uploaderId) {
    try {
      const gamesRef = ref(db, 'games');
      const newGameRef = push(gamesRef); // Generate a unique game ID
    
      const gameData = {
        title: title,
        description: description,
        thumbnailUrl: thumbnailUrl,
        pythonUrl: pythonUrl,
        uploaderId: uploaderId, // Add the uploader's ID to the game data
        downloadsCount: 0
      };
  
      set(newGameRef, gameData);
      console.log('Game data uploaded successfully');
    } catch (error) {
      console.error('Error uploading game data:', error);
    }
  }