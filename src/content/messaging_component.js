import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push, get } from 'firebase/database'; 
import { auth } from '../firebase';
import "./chat.css";

/**
 * Implements a chat application using Firebase Realtime Database.
 * It displays messages from all users in the social tab and allows sending new messages.
 * It also displays the username of the person that sent the message
 */
function Chat() {
    // State variables to store messages, new message input, and username
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    /**
     * Sets up the database functionality to retrieve and display messages.
     * Also fetches the current user's username to display with their messages.
     */
    useEffect(() => {
        const database = getDatabase();
        const messagesRef = ref(database, 'messages');
        
        // Retrieve and listen for changes to messages
        onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            const messagesList = [];
            for (let id in messagesData) {
                messagesList.push({ id, ...messagesData[id] });
            }
            setMessages(messagesList);
        });

        // Retrieve the current user's username
        const user = auth.currentUser;
        const userRef = ref(database, 'users/' + user.uid);
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

    /**
     * Handles the change event for the new message input field.
     * @param {Object} e - The event object.
     */
    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    /**
     * Handles sending a new message to the database.
     */
    const handleSend = async () => {
        const database = getDatabase();
        const messagesRef = ref(database, 'messages');
        const message = {
            username: username,
            text: newMessage
        };
        await push(messagesRef, message);
        setNewMessage('');
    };

    /**
     * hides the displayed chat messages.
     */
    const handleClear = () => {
        setMessages([]);
    };

    // Creates the chat UI
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
