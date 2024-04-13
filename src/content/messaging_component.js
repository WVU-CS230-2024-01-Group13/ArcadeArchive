import React, { useState } from 'react';
import './messagingviewstyle.css';

const MessagingComponent = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [chatHistory, setChatHistory] = useState('');

  const stopRefresh = (event) => {
    event.preventDefault();
  };

  const message = (username) => {
    setSelectedUser(username);
    const history = getHistory(username);
    setChatHistory(history);
  };

  const getHistory = (username) => {
    const history = "Chat history will be retrieved from the database";
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
            onClick={(event) => stopRefresh(event)}
          />
        </form>
      </div>
    </div>
  );
};

export default MessagingComponent;