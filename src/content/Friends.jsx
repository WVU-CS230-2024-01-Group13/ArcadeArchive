import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {follow, unfollow} from '../contexts/dbContext'
import { useAuth } from '../contexts/AuthContext.js';


function Friends(){
    const navigate = useNavigate();

    const [toUserId, setToUserId] = useState('');
    useAuth();

    const handleFollow = () => {
        follow(toUserId);
        navigate("/explore");
    };

    const handleUnfollow = () => {
        unfollow(toUserId);
        navigate("/explore");
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