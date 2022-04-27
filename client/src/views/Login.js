import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Logging() {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleUsername = (e) => {
        setUserName(e.target.value)
        
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const handleSubmit = async (e) => {
        if (username !== "" && password !== "") {


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
                    alert("You are logged in");
                    navigate("/upload");
                }
            }
            ).catch(function (error) {
                alert(error);
            }
            );

        }
        else {
            alert("Please fill all fields");
        }

    }

    return (
        <div className="App">

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

        </div>




            );


}