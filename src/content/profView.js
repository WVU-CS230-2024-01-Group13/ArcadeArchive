import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { ref, get } from 'firebase/database';
import { ref as sRef, getDownloadURL } from 'firebase/storage';
import './styles.css'
import './profSettingsPage.css'
import { Form } from 'react-bootstrap';


export default function ProfView() {

    const { currentUser, logout } = useAuth()
    const [userData, setUserData] = useState(null)
    const [photoURL, setPhotoURL] = useState('')
    const [error, setError] = useState("")
    const navigate = useNavigate()

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
            getDownloadURL(sRef(storage, `profilePictures/${currentUser.uid}`)).then(snapshot => {
                setPhotoURL(snapshot)
            });
        }
    }, [currentUser]);


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
        <div>
            {error && <div>{error}</div>}
            {userData && (


                <div>
                    <Form style={{ marginBottom: 500 }}>
                        <div style={{ padding: 10 }}>
                            <Form.Group>
                                <div className="profileView-picture">
                                    <img src={photoURL} alt="Profile" />
                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ padding: 10 }}>
                            <Form.Group className="mb-2">
                                <h1 className="jersey-15-regular">{userData.username ? userData.username : userData.email}'s Profile</h1>
                            </Form.Group>
                        </div>
                        <div style={{ padding: 10 }}>
                            <Form.Group className="mb-2">
                                <p className="jersey-15-regular" style={{ fontSize: 20 }}>{userData.bio ? userData.bio : "Update Bio to Display Here"}</p>
                                <div style={{ padding: 10 }}>
                                    <Link to={"/profile/settings"}><button className="jersey-15-regular" style={{ fontSize: 30 }}>Edit Profile</button ></Link>
                                </div>
                                <div style={{ padding: 10 }}>
                                    <button className="jersey-15-regular" style={{ fontSize: 30 }} onClick={handleLogout}>Log Out</button >
                                </div>
                            </Form.Group>
                        </div>
                    </Form>

                </div>
            )}
        </div>

    );
}



