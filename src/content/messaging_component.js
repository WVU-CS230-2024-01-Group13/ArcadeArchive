// This funciton implements a chat. It uses the Firebase realtime database to do so
// it takes the username store with your account information as well as the message you input and displays it to the screen and all other users in the socail tab. 
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push, get } from 'firebase/database'; 
import { auth} from '../firebase'
import "./chat.css"

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // sets up database functionality and gets the perious messages
        const database = getDatabase();
        const messagesRef = ref(database,'messages');
        onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            const messagesList = [];
            for(let id in messagesData) {
                messagesList.push({ id, ...messagesData[id] });
            }
            setMessages(messagesList);
        });
        //gets username to display in database and in message
        const user = auth.currentUser;
        const userRef = ref(database, 'users/'+user.uid);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUsername(userData.username);
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };
    // handles the input in the chat
    const handleSend = async () => {
        const database = getDatabase();
        const messagesRef = ref(database,'messages');
        const message = {
            username: username,
            text: newMessage
        };
        await push(messagesRef, message);
        setNewMessage('');
    };
    // hide chat messages
    const handleClear = () => {
        setMessages([]);
    };

    return (
        <div>
            <div className='card-body'>
                {messages.map((message, index) => (
                    <div key={index} className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{message.username}</h5>
                            <p className='card-text'>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <input type='text' value={newMessage} onChange={handleInputChange} placeholder='Enter Message Here' />
            <button onClick={handleSend}>Send</button>
            <button onClick={handleClear}>Hide Chat</button>
        </div>
    );
}

export default Chat;