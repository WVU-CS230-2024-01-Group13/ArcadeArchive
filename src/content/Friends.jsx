import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {follow, unfollow} from '../contexts/dbContext'
import { useAuth } from '../contexts/AuthContext.js';
import {ref, getDatabase, onValue} from 'firebase/database';
import './friendsStyles.css';

function Friends(){
    //declaration of constants used throughout the code
    const navigate = useNavigate();
    const [toUserId, setToUserId] = useState('');
    const {currentUser} = useAuth();
    const auth = useAuth();
    const[followers, setFollowers] = useState([]);
    const[following, setFollowing] = useState([]);


    //handles the following functionality by calling the follow() method for the current user id
    //navigates back to explore when done
    const handleFollow = () => {
        follow(toUserId);
        navigate("/explore");
    };

    //handles the unfollowing functionality by calling the unfollow() method for the current user id
    //navigates user back to explore when done
    const handleUnfollow = () => {
        unfollow(toUserId);
        navigate("/explore");
    };

    //function down below handles displaying the current followers and following
    useEffect(() => {

        //if user isn't logged in, takes them to the login page
        if (!currentUser) {
            navigate('/login');
            return;
        }

        //database reference
        const db = getDatabase();

        //current user reference
        const userRef = ref(db, 'users/' + currentUser.uid);
        
        //gets snapshot of current user information
        onValue(userRef,(snapshot) => {

            //initialize current user data
            const userData = snapshot.val();

            //checks if data, followers, and following is not null
            if (userData && userData.followers && userData.following) {

                //references for followers and following collections
                const followersRef = ref(db, 'users/' + Object.keys(userData.followers));
                const followingRef = ref(db, 'users/' + Object.keys(userData.following));

                //arrays for storing usernames of followers/following
                const followersNames = [];
                const followingNames = [];

                //gets snapshot of follower collection
                onValue(followersRef, (childsnapshot) => {
                    
                    //initalize value of follower collection
                    const user = childsnapshot.val();

                    //checks if user and username are not null
                    if(user && user.username){
                        followersNames.push(user.username);
                    }

                    //log for debugging
                    console.log(followersNames);
                    
                    //sets followers to the values in the followerNames array
                    setFollowers(Object.values(followersNames));
                });
                
                //gets snapshot of following collection
                onValue(followingRef, (childsnapshot) => {
                    
                    //initialize value of following collection
                    const user = childsnapshot.val();

                    //checks if user and username aren't null
                    if(user && user.username){
                        followingNames.push(user.username);
                        
                    }

                    //log for debugging
                    console.log(followingNames);

                    //sets following to the values in the followingNames array
                    setFollowing(Object.values(followingNames));
                });
                

            }
            
        });
    }, [currentUser, navigate]);



    //HTML page

    return (
        <>
        <div className = "friendRequestPage">
            <div className = "followArea">
                <input type="text" placeholder = "Username" value = {toUserId} 
                onChange = {(e)=>setToUserId(e.target.value)} />
                <button className = "button" type = "button" onClick = {handleFollow}>
                    Follow
                </button>
                <button className = "button" type = "button" onClick = {handleUnfollow}>
                    Unfollow
                </button>
            </div>
            <div className="followerList">
                <table>
                    <thead>
                        <tr>
                            <th>Followers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {followers.map((follower, index) => (
                            <tr key={index}>
                                <td>{follower}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            <div className = "followingList">
                    <table>
                            <thead>
                                <tr>
                                    <th>Following</th>
                                </tr>
                            </thead>
                    <tbody>
                        {following.map((following, index) => (
                            <tr key={index}>
                                <td>{following}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </div>
        </>
       );
}

export default Friends;