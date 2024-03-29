import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import app from '../firebase.js';
import './PasswordRecoveryStyles.css';
const PasswordRecovery = () =>{

    const [email, setEmail] = useState('');
    const auth = getAuth();

    const sendReset = async() => {
        await sendPasswordResetEmail(auth, email);
    }
   
    return (
    <>
    <div className = "resetPage">
        <input type="text" placeholder = "Email:" value = {email} 
        onChange = {(e)=>setEmail(e.target.value)} />
        <button className = "button" type = "button" onClick = {sendReset}>
        Reset Password
        </button>
        
    </div>
    </>
   );
}
export default PasswordRecovery;