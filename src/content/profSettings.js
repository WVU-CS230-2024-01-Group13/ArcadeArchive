import React, { useState, useEffect, useAuth } from 'react';
import { useNavigate } from 'react-router-dom';

const profSettingsPage = () => {
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profPic, setPic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setDisplayName(currentUser.displayName);
            setEmail(currentUser.email);
            setBio(currentUser.bio);
            setPic(currentUser.profPic);
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await updateUserProfile(currentUser, { displayName, email, bio, profPic });
            navigate("/profile")
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <h2>Profile Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Display Name:</label>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label>Profile Pic:</label>
                    <input type="file" value={profPic} onChange={(e) => setPic(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Bio:</label>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>

    );
};

export default profSettingsPage;