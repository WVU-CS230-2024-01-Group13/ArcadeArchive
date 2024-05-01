import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../firebase.js';

const PasswordRecovery = () =>{

    const [email, setEmail] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const sendReset = async() => {
        try{
        await sendPasswordResetEmail(auth, email);
        navigate('/');
        }
        catch(error){
            console.error(error);
        }
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