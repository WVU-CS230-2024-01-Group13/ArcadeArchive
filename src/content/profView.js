import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { dbSignup } from '../contexts/dbContext'
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';

export default function ProfView () {

    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    
    return (
        <>
            <h2  className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <img src={currentUser.profPic} alt="Profile" />
            <h1 classname='text-center mb-4'>{currentUser.username ? currentUser.username : currentUser.email}'s Profile</h1>
            <p>{currentUser.bio ? currentUser.bio : "Update Bio to Display Here"}</p>
            <Link to='/profile/settings'><button class="btn btn-secondary" >Edit Profile</button ></Link>

            <div className="w-100 text-center mt-2">
                <button class='btn btn-secondary' variant="link" onClick={handleLogout}>Log Out</button>
            </div>
        </>
    );
}