import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {follow, unfollow} from '../contexts/dbContext'
import { useAuth } from '../contexts/AuthContext.js';


function Friends(){
    const navigate = useNavigate();

    const [toUserId, setToUserId] = useState('');
    const auth = useAuth();

    const handleFollow = () => {
        follow(toUserId);
    };

    const handleUnfollow = () => {
        unfollow(toUserId);
    };
    
    //HTML page

    return (
        <>
        <div className = "friendRequestPage">
            <input type="text" placeholder = "Username" value = {toUserId} 
            onChange = {(e)=>setToUserId(e.target.value)} />
            <button className = "button" type = "button" onClick = {handleFollow}>
                Follow
            </button>
            <button className = "button" type = "button" onClick = {handleUnfollow}>
                Unfollow
            </button>
    
        </div>
        </>
       );
}

export default Friends;