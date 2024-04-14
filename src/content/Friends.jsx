import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {
getFirestore, 
collection,
add,
deleteDoc
} 
from 'firebase/firestore';
import app from '../firebase.js';


function Friends(){
    const db = getFirestore(app);
    const reqsRef = collection(db, 'requests');
    const usersRef = collection(db, 'users');

    const [userId,setUserId] = useState('');
    
    const sendRequest = async ()=>{
        try{
            await reqsRef.add({
                fromUser: userId,
                toUser: userId,
                status: "pending"
         });
        } catch(error){
            console.error(error);
        }
    }

    const deleteRequest = async(fromUser,toUser)=>{
        try{
            await reqsRef.deleteDoc("userOne");
        }catch(error){
        console.error(error);
        }
    }

    return (
        <>
        <div className = "friendRequestPage">
            <input type="text" placeholder = "Username" value = {userId} 
            onChange = {(e)=>setUserId(e.target.value)} />
            <button className = "button" type = "button" onClick = {sendRequest}>
            Send Friend Request
            </button>
    
        </div>
        </>
       );
}

export default Friends;