
import React,{ useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { dbSignup } from '../contexts/dbContext'
/**
 * The file contains the functionality for the sign up feature of our site.
 * It connects and places all of the users information 
 * into the Firebase realtime database as well as Firebase Auth.
 */
/**
 * Signup()
 * This function show the sign up componets 
 * handles the information that the user has input and sends it to the Firebase Auth and data base. 
 * @returns Signup form
 */
export default function Signup() {
    // Initializing necessary states and refs
     
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    /**handleSubmit(e)
     * Handles form submission form the user
     * This funtion handles the information submitted.
     * It Makes sure that the inputs are valid and allows the signup and dbSignup functions to go through 
     * @param {Event} e - form submission event
     */
    async function handleSubmit(e) {
        e.preventDefault()
        //Make sure passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value ) //puts user info into auth
            dbSignup(emailRef.current.value, usernameRef.current.value) // puts user info into realtime database
            navigate("/")  // navigates to the homepage
        } catch(err) {
            console.log(err);
            setError('Failed to create an account')
        }

        setLoading(false)
    }
     
    
     // Render signup form
     
  return (
    <>
        <Card>
            <Card.Body>
                <h2  className='text-center mb-4'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" ref={usernameRef} required />
                    </Form.Group>

                    
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>

                    <Button disabled={loading} className='w-100 mb-4 mt-4' type='submit'>Sign Up</Button>
                
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Form>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Card.Body>
        </Card>
    </>
  )
}
