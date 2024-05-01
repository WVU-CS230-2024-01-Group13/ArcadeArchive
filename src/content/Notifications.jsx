import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const followersRef = ref(db, `users/${currentUser.uid}/followers`);
            onValue(followersRef, (snapshot) => {
                const followers = snapshot.val();
                if (followers) {
                    const followerIds = Object.keys(followers);
                    const newNotifications = followerIds.map((followerId) => ({
                        id: followerId,
                        message: `${followerId} started following you.`
                    }));
                    setNotifications(newNotifications);
                }
            });
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
