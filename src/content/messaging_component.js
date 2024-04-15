import React, { useState } from 'react';
import './messagingviewstyle.css';

const MessagingComponent = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [chatHistory, setChatHistory] = useState('');
  var db = firebase.database();
  const stopRefresh = (event) => {
    event.preventDefault();
  };
  const message = (username) => {
    setSelectedUser(username);
    const history = getHistory(username);
    setChatHistory(history);
  };
// CHAT class to house all operation needed to create a chat

  // chat() is used to create the chat page
    function chat(){
      this.create_title()
     this.create_chat()
    };

  function send_message(message, username)  {
    setSelectedUser(username);
    const history = getHistory(username);
    setChatHistory(history);
    var parent = this
    // if  there is no message
    // then return/don't send the message
    if( message == null){
      return
    }
    db.ref('chats/').once('value', function(message_object) {
      // This index is mortant. It will help organize the chat in order
      var index = parseFloat(message_object.numChildren()) + 1
      db.ref('chats/' + `message_${index}`).set({
        name: username,
        message: message,
        index: index
      })
      // refreshs the chat globally 
      .then(function(){
        parent.refresh_chat()
      })
    })
  };

   getHistory = (username) => {
    const history = db.ref('chats/').doc(username);
    return history;
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th colSpan="2">friends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="50px">
              <img src="samplepfp.png" alt="" height="50" width="50" />
            </td>
            <td>
              <button type="button" onClick={() => message('username1')}>
                username1
              </button>
            </td>
          </tr>
          <tr>
            <td width="50px">
              <img src="samplepfp.png" alt="" height="50" width="50" />
            </td>
            <td>
              <button type="button" onClick={() => message('username2')}>
                username2
              </button>
            </td>
          </tr>
          <tr>
            <td width="50px">
              <img src="samplepfp.png" alt="" height="50" width="50" />
            </td>
            <td>
              <button type="button" onClick={() => message('username3')}>
                username3
              </button>
            </td>
          </tr>
          <tr>
            <td width="50px">
              <img src="samplepfp.png" alt="" height="50" width="50" />
            </td>
            <td>
              <button type="button" onClick={() => message('username4')}>
                username4
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div id="messagebox" className="messagebox">
        <div id="user" className="user">
          {selectedUser && <p>{selectedUser}</p>}
        </div>
        <div id="chat" className="chat">
          {chatHistory && <p>{chatHistory}</p>}
        </div>
        <form id="messageform">
          <input type="text" id="message" name="message" placeholder="type here" />
          <input
            id="send"
            type="submit"
            value="send"
            
            onClick={(event) => send_message(message,'username')}//username is a placeholder, right now there is no username in the database
          />
        </form>
      </div>
    </div>
  );
};

export default MessagingComponent;