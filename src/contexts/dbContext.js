//import React, { useContext, useState, useEffect } from 'react'
import { db } from '../firebase';
import { ref, set, get} from 'firebase/database'; 
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