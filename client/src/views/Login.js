import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function Logging() {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleUsername = (e) => {
        setUserName(e.target.value)
        setError(false)

    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setError(false)
    }
    const Back = () => {
        navigate('/')
    }

    const handleErrors = () => {
        return (
            <div
                className="error"
                style={{
                    color: red,
                    display: error ? '' : 'none',
                }}>
                <h1>Invalid Username or Password</h1>
            </div>
        );
    }
    const handleSubmit = async (e) => {



        axios.post('http://localhost:8080/login', {
            username: username,
            password: password
        }
        ).then(function (response) {
            console.log(response);
            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate("/graphs");
                setError(false);

            }
        }
        ).catch(function (error) {
            setError(true);
        }
        );



    }

    return (
        <div className="App">

            <header className='App-full'>

                <div className='Nav-bar-Logout'>
                    <Button variant="contained" onClick={Back}>Back</Button>

                </div>

                <div className="messages">
                    {handleErrors()}
                </div>
                <div className="m-4">
                    <label>Username:</label>
                    <input
                        onChange={handleUsername}
                        value={username}
                        id="username"
                        type="username"
                        className="m-4"
                        placeholder="Enter username"
                    />
                </div>
                <div className="m-4">
                    <label>Password:</label>
                    <input
                        id="password"
                        onChange={handlePassword}


                        value={password}
                        type="password"
                        className="m-4"
                        placeholder="Enter password"
                    />
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
                <div className="m-4">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>

                </div>
            </header>

        </div>




    );


}