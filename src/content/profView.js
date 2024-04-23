import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

const ProfView = () => {

    const { currentUser } = useAuth();

    return (
        <div>
            <img src={currentUser.profPic} alt="Profile" />
            <h1>{currentUser.displayName ? currentUser.displayName : currentUser.email}'s Profile</h1>
            <p>{currentUser.bio ? currentUser.bio : "Update Bio to Display Here"}</p>
            <Link to='/profile/settings'><button class="btn btn-secondary" >Edit Profile</button ></Link>
        </div>
    );
};

export default ProfView;