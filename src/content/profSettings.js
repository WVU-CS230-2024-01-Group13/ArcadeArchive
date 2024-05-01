import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { updateUserProfile, upload } from '../contexts/dbContext';
import { ref, get } from 'firebase/database';
import { ref as sRef } from 'firebase/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { Form } from "react-bootstrap";
import "./profSettingsPage.css";
import "./styles.css";


export default function ProfSettingsPage() {

    //create all necessary constants
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [newPhoto, setNewPhoto] = useState('')
    const [photoURL, setPhotoURL] = useState('https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png')


    useEffect(() => {

        //check that current user is valid
        if (currentUser) {

            //reference to current user
            const userRef = ref(db, `users/${currentUser.uid}`);

            //get user data from database
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
            getDownloadURL(sRef(storage, `profilePictures/${currentUser.uid}`)).then(snapshot => {
                setPhotoURL(snapshot)
            });
        }
    }, [currentUser]);

    //function to update username
    const handleUpdateUsername = async () => {
        try {

            //set new username data
            await updateUserProfile(currentUser.uid, { username: newUsername });
            setUserData({ ...userData, username: newUsername });
            setNewUsername('');
        } catch (error) {
            setError('Error updating username: ' + error.message);
        }
    };

    //function to update bio
    const handleUpdateBio = async () => {
        try {

            //set new bio data
            await updateUserProfile(currentUser.uid, { bio: newBio });
            setUserData({ ...userData, bio: newBio });
            setNewBio('');
        } catch (error) {
            setError('Error updating bio: ' + error.message);
        }
    };

    //function to update email
    const handleUpdateEmail = async () => {
        try {
            await updateUserProfile(currentUser.uid, { email: newEmail })
            setUserData({ ...userData, email: newEmail })
            setNewEmail('')
        } catch (error) {
            setError('Error updating email address: ' + error.message);
        }
    };

    const handleUpload = async () => {
        uploadBytes(sRef(storage, `profilePictures/${currentUser.uid}`), newPhoto)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                setPhotoURL(snapshot)
            });
    }
    return (
        <div>
            <h2 className='jersey-15-regular'>Profile Settings</h2>
            {error && <div>{error}</div>}
            {userData && (
                <div>
                    <Form>
                        <div style={{ padding: 10 }}>
                            <Form.Group>
                                <div className="profile-picture">
                                    <img src={photoURL} alt='avatar' />
                                </div>
                                <Form.Control type="file" onChange={(e) => setNewPhoto(e.target.files[0])} />
                                <div style={{ padding: 10 }}>
                                    <button className="jersey-15-regular" style={{ fontSize: 20 }} onClick={handleUpload}>Upload Profile Picture</button>
                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ padding: 10 }}>
                            <Form.Group className="mb-2">
                                <h4 className='jersey-15-regular'>Current Username: {userData.username}</h4>
                                <Form.Control
                                    type="text"

                                    className="form-control border p-2"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                                <div style={{ padding: 10 }}>
                                    <button className="jersey-15-regular" style={{ fontSize: 20 }} onClick={handleUpdateUsername}>Update Username</button>
                                </div>
                            </Form.Group>
                        </div>


                        <div style={{ padding: 10 }}>
                            <Form.Group className="mb-2">
                                <h4 className='jersey-15-regular'>Current Bio: {userData.bio}</h4>
                                <Form.Control
                                    type="textArea"

                                    className="form-control border p-2"
                                    value={newBio}
                                    onChange={(e) => setNewBio(e.target.value)}
                                />
                                <div style={{ padding: 10 }}>
                                    <button className="jersey-15-regular" style={{ fontSize: 20 }} onClick={handleUpdateBio}>Update Bio</button>
                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ padding: 10 }}>
                            <Form.Group className="mb-2">
                                <h4 className='jersey-15-regular'>Current Email Address: {userData.email}</h4>
                                <Form.Control
                                    type="email"

                                    className="form-control border p-2"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <div style={{ padding: 10 }}>
                                    <button className="jersey-15-regular" style={{ fontSize: 20 }} onClick={handleUpdateEmail}>Update Email Address</button>
                                </div>
                            </Form.Group>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
}