//import React, { useContext, useState, useEffect } from 'react'
import { push, ref, set, remove, get, update} from 'firebase/database';
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
 export function chatDB (username, message){
    const userRef=ref(db,'chats/' )
    get(userRef,function(message_object){ 
    
        var index = parseFloat(message_object.numChildren()) + 1
    ref(db,'chats/' + `message_${index}`).set({
          name: username,
          message: message,
          index: index
        })
          // refreshs the chat globally 
          .then(function () {
            
          })
      })
    }
    export function get_name(){
        const user = auth.currentUser;

     if (user) {
        const userId = user.uid;

        const usersRef=ref(db,'users/' + userId)
         get(usersRef, (snapshot) => {
          
        const userData = snapshot.val();
          console.log('userData')
        const username = userData.username;
        console.log('Username:', username);
        return username
         }, (error) => {
             console.error('Error fetching user data:', error);
             });
            } else {
             console.log('No user is currently signed in.');
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

  export async function updateUserProfile(uid, updates) {
    try {
        const userRef = ref(db, `users/${uid}`);
        await update(userRef, updates);
        console.log('User profile updated successfully');
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}