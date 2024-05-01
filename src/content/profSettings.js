import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { updateUserProfile } from '../contexts/dbContext';
import { ref, get } from 'firebase/database';

export default function ProfSettingsPage() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            const userRef = ref(db, `users/${currentUser.uid}`);
            get(userRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        console.log('No such document!');
                    }
                })
                .catch(error => {
                    console.error('Error getting document:', error);
                });
        }
    }, [currentUser]);

    const handleUpdateUsername = async () => {
        try {
            await updateUserProfile(currentUser.uid, { username: newUsername });
            setUserData({ ...userData, username: newUsername });
            setNewUsername('');
        } catch (error) {
            setError('Error updating username: ' + error.message);
        }
    };

    const handleUpdateBio = async () => {
        try {
            await updateUserProfile(currentUser.uid, { bio: newBio });
            setUserData({ ...userData, bio: newBio });
            setNewBio('');
        } catch (error) {
            setError('Error updating bio: ' + error.message);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            // Update email logic
        } catch (error) {
            setError('Error updating email address: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Profile Settings</h2>
            {error && <div>{error}</div>}
            {userData && (
                <div>
                    <h3>Username: {userData.username}</h3>
                    <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    <button onClick={handleUpdateUsername}>Update Username</button>

                    <h3>Bio: {userData.bio}</h3>
                    <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} />
                    <button onClick={handleUpdateBio}>Update Bio</button>

                    <h3>Email Address: {userData.email}</h3>
                    <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <button onClick={handleUpdateEmail}>Update Email Address</button>
                </div>
            )}
        </div>
    );
}
