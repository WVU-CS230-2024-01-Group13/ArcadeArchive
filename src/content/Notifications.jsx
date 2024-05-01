import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';

function Notifications() {

    //create all necessary constants
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useAuth();


    //function to show notification
    useEffect(() => {

        //check if currentUser is valid
        if (currentUser) {

            //reference for current user followers list
            const followersRef = ref(db, `users/${currentUser.uid}/followers`);

            //get followers collection
            onValue(followersRef, (snapshot) => {

                //initialize followers value
                const followers = snapshot.val();

                //check that followers is valid
                if (followers) {
                    const followerIds = Object.keys(followers);
                    const newNotifications = followerIds.map((followerId) => ({
                        id: followerId,
                        message: `${followerId} started following you.`
                    }));

                    //set the notification
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
