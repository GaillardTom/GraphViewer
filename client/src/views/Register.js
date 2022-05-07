import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
export default function Register() {

    const navigate = useNavigate()

    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPass] = useState('');
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleUsername = (e) => {
        setUserName(e.target.value)
        setSubmitted(false)
    }
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    const confirmPass = (e) => {
        setComfirmPass(e.target.value)
        setSubmitted(false)

    }
    // Handling the email change
    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || lastName === '' || password === '' || confirmPassword !== password || username === "") {
            setError(true);
        } else {
            axios.post('http://localhost:8080/register', { 
                "username": username,
                "firstName": name,
                "lastName": lastName,
                "password": password
            }).then(function(response){ 
                console.log('response: ', response);
                if (response.status === 200){ 
                    setSubmitted(true);
                    setError(false);
                    navigate("/login");
                }
            }).catch(function(response){ 
                if(response !== 200)
                { 
                    console.log("USERNAME TAKEN");
                    setSubmitted(false);
                    setError(true)
                    userNameTaken()
                    alert('Username already taken')                
                }
            })
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };
    const userNameTaken = () => { 
        return( 
            <div className="error">
                <h1>Username Already Taken</h1>
            </div>
        )
    }
    const Back = () => { 
        navigate('/')
    }

    return (
        <div className="App">
             <header className="App-full">

            
             <div className='Nav-bar-Logout'>
                    <Button variant="contained" onClick={Back}>Back</Button>

                </div>

            {/* Calling to the methods */}
            

            <div className='RegisterForm'>
                {/* Labels and inputs for form data */}
                <div id="reg">
                    <h1>User Registration</h1>
                </div>
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <div id="reg" className="register">
                    <label className="label">Username</label>
                    <input onChange={handleUsername} className="input"
                        value={username} type="text" />
                </div>

                <div id="reg" className="register">
                    <label className="label">First Name</label>
                    <input onChange={handleName} className="input"
                        value={name} type="text" />
                </div>
                <div id="reg" className="register">

                    <label className="label">Last Name</label>
                    <input onChange={handleLastName} className="input"
                        value={lastName} type="text" />

                </div>
                <div id="reg" className="register">

                    <label className="label">Password</label>
                    <input onChange={handlePassword} className="input"
                        value={password} type="password" />
                </div>
                <div id="reg" className="register">
                    <label className='label'>Confirm Password</label>
                    <input onChange={confirmPass} className="input"
                        value={confirmPassword} type="password" />
                </div>
                <div className="register">
                    <Button onClick={handleSubmit} variant="contained" className="Submit">
                        Submit
                    </Button>
                </div>

            </div>
            </header>

        </div>
    );

}
