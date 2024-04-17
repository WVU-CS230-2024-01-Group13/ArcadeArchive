import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'firebase/firestore';
import 'firebase/storage';
import { db } from '../firebase';

export default function ProfSettingsPage() {
    const { currentUser } = useAuth();

    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [email, setEmail] = useState(currentUser.email);
    const [bio, setBio] = useState(currentUser.bio);
    const [profPic, setPic] = useState('');
    const [profilePicURL, setProfilePicURL] = useState(currentUser.profPic);
    const Navigate = useNavigate;

    const handleSaveChanges = async () => {
        try {
            const userRef = db.collection('users').doc(currentUser.uid);

            // Update display name and bio
            await userRef({
                displayName,
                email,
                bio
            });




            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to save changes. Please try again.');
        }
    };


    return (
        <div>
            <h2>Profile Settings</h2>
            <form onSubmit={handleSaveChanges}>
                <div>
                    <label>Display Name:</label>
                    <input type="text" value={currentUser.displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Bio:</label>
                    <input type="text" value={currentUser.bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <button onClick={handleSaveChanges}>Update Profile</button>
            </form>
        </div>

    );
};