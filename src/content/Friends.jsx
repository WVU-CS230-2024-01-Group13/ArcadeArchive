import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {follow, unfollow} from '../contexts/dbContext'
import { getDatabase, ref, onValue, get} from 'firebase/database'
import { useAuth } from '../contexts/AuthContext.js';
import './friendsStyles.css'

function Friends(){
    const navigate = useNavigate();
    const [toUserId, setToUserId] = useState('');
    const auth = useAuth();
    const[followers, setFollowers] = useState([]);
    const[following, setFollowing] = useState([]);

    const{ currentUser } = useAuth();

    const handleFollow = () => {
        follow(toUserId);
    };

    const handleUnfollow = () => {
        unfollow(toUserId);
    };



    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const db = getDatabase();
        const userRef = ref(db, 'users/' + currentUser.uid);
        
        onValue(userRef,(snapshot) => {
            const data = snapshot.val();
            if (data && data.followers && data.following) {
                const followerNameRef = ref(db, 'users/' + Object.keys(data.followers));
                const followingNameRef = ref(db, 'users/' + Object.keys(data.following));
                const followersNames = [];
                const followingNames = [];
                onValue(followerNameRef, (jsnapshot) => {
                    const user = jsnapshot.val();
                    if(user && user.username){
                        followersNames.push(user.username);
                    }
                    console.log(followersNames);
                    setFollowers(Object.values(followersNames));
                });
                onValue(followingNameRef, (fsnapshot) => {
                    const fuser = fsnapshot.val();
                    if(fuser && fuser.username){
                        followingNames.push(fuser.username);
                    }
                    console.log(followingNames);
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