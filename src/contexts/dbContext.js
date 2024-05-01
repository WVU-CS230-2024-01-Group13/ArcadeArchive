//import React, { useContext, useState, useEffect } from 'react'
import { push, ref, set, remove, get, update} from 'firebase/database';
import { db, auth } from '../firebase';

/**
 * 
 * @param {*} username : username to check for
 * @returns true if username is taken, false if 'users' collection is empty or username is not taken.
 * 
 * Asynchronous function returning a boolean value indicating
 * whether a given username is in the 'users' collection
 * in the database. It takes a username as its only parameter.
 */
async function isUsernameTaken(username) {
    const usersRef = ref(db, 'users'); //reference to 'users' collection
    const snapshot = await get(usersRef); //reference to the current snapshot of the 'users' collection
    
    //checks if there is data in the snapshot, as a guard condition.
    if (snapshot.exists()) {
        const users = snapshot.val(); //reference to the actual values in 'users' collection
        return Object.values(users).some(user => user.username === username);
        /**return whether there is some value for 'username' for any user which
        matches the given parameter when compared as an object.*/
    }

    //if the snapshot has no data, return false.
    return false;
}

    /**
     * 
     * @param {*} email : email provided in signup form
     * @param {*} username : username provided in signup form
     * 
     * function to input user data into the firebase realtime database.
     * Takes an email and username as parameters, with no return value.
     * The function takes the email/username, and updates the database
     * with a new user, using the appropriate values. Errors are
     * handled with a try/catch block.
     */
    export async function dbSignup  (email, username)  {
        try {
            const user =auth.currentUser;  //retrieves current user information using firebase auth

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
            const usersRef = ref(db, 'users/' + user.uid); //adds new user with a randomly generated ID key
             set(usersRef, user_data); //sets the user data to the new user reference.
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
    /**
     * Retrieves the username of the current user.
     */
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

    /**
     * 
     * @param {*} toUsername : User to follow
     * 
     * Takes a username as a parameter, and attempts to add the user ID to
     * the following list of the current user, and the current user ID to
     * the followers list of the given user. Errors handled with try/catch block.
     */
export async function follow(toUsername) {
    try {
        const sender = auth.currentUser; //retrieves current user information using firebase auth
        const usersRef = ref(db, 'users'); //reference to 'users' collection in the database

        const snapshot = await get(usersRef); //gets data values for 'users' collection

        //loops through child elements of the snapshot
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val(); //user data for snapshot at current index
            if (userData.username === toUsername) { //object comparision with parameter username
                const userId = childSnapshot.key; //retrieves user ID for current snapshot
                console.log("User ID:", userId);
                //updates database appropriately to add follow.
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

/**
 * 
 * @param {*} toUsername 
 * 
 * Takes a username as a parameter, and attempts to remove the user ID from
 * the following list of the current user, and the current user ID from
 * the followers list of the given user. Errors handled with try/catch block.
 */
export async function unfollow(toUsername) {
    try {
        const sender = auth.currentUser; //retrieves current user information using firebase auth
        const usersRef = ref(db, 'users'); //reference to 'users' collection in the database

        const snapshot = await get(usersRef);//gets data values for 'users' collection

        //loops through child elements of the snapshot
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val(); //user data for snapshot at current index
            if (userData.username === toUsername) { //object comparision with parameter username
                const userId = childSnapshot.key; //retrieves user ID for current snapshot
                console.log("User ID:", userId);
                //updates database to unfollow the parameter username
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

/**
 * 
 * @param {*} title : given title to add to gameData
 * @param {*} description : given description to add to gameData
 * @param {*} thumbnailUrl : given url to thumbnail picture to add to gameData
 * @param {*} pythonUrl : given url to python source code to add to gameData
 * @param {*} uploaderId : ID of the uploader of the game
 * 
 * Takes five parameters and updates the 'games' collection with a new game containing the values
 * Errors are handled with a try/catch block.
 */
export async function uploadGame(title, description, thumbnailUrl, pythonUrl, uploaderId) {
    try {
      const gamesRef = ref(db, 'games'); // reference to 'games' collection
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