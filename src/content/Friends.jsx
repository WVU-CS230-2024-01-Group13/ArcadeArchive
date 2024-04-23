import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {
getFirestore, 
collection,
doc,
setDoc,
deleteDoc,
getDoc
} 
from 'firebase/firestore';
import app from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';


function Friends(){
    //Contains reference to database, 'requests' collection, 'Friends' collection, and 'users' collection
    const db = getFirestore(app);
    const reqsRef = collection(db, 'requests');
    const friendsRef = collection(db, 'Friends');
    const usersRef = collection(db, 'users');

    const navigate = useNavigate();

    //allows get/set of fromUser and toUser
    const [userId,setUserId] = useState('');
    const [toUserId, setToUserId] = useState('');

    const auth = useAuth();

    //Should theoretically retrieve user information (doesn't currently work)
    useEffect(() => {
        const getCurrentUsername = async()=>{
            if(auth.currentUser){
                const userDoc = await usersRef.doc(auth.currentUser.uid).get();
                if(userDoc.exists){
                    const userData = userDoc.data();
                    setUserId(userData.username);
                }
            }
        }
    }, [auth.currentUser]);
    
    //Handles friend request (writes to the database)
    const sendRequest = async ()=>{
        var reqData = {
            fromUser: userId,
            status: "added",
            toUser: toUserId
        };

        var friendsData = {
            friend1: toUserId
        };
        
        try{
            await setDoc(doc(reqsRef), reqData);
            await setDoc(doc(friendsRef), friendsData);
            navigate("/");
        } 
        catch(error){
            console.error(error);
        }
    }

    //not currently working
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
            <input type="text" placeholder = "Username" value = {toUserId} 
            onChange = {(e)=>setToUserId(e.target.value)} />
            <button className = "button" type = "button" onClick = {sendRequest}>
            Send Friend Request
            </button>
    
        </div>
        </>
       );
}

export default Friends;