import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import { sizeWidth } from '@mui/system';

function Protected() {
    const [graphImage, setGraphImage] = React.useState('')
    const navigate = useNavigate()

    React.useEffect(() => {
        axios.defaults.headers.common['token'] = localStorage.getItem('token');

        const getGraphs = async () => {
            const GraphsFromServer = await fetchImage()
            setGraphImage(GraphsFromServer)

        }
        getGraphs()
    }, [])

    const fetchImage = async () => {
        const res = await localStorage.getItem('graphLocation')
        const path = `http://localhost:8080/static${res}`

        console.log('path ', path);
        const serverRes = await axios.get(path)
        const data = await serverRes.data
        console.log('serverRes: ', serverRes);

        console.log('data: ', data);
        return path
    }

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const Back = () => {
        navigate('/graphs')
    }

    return (
        <div className="App">
            <div className='App-full'>
            <div className='Nav-bar-Logout'>
                    <Button variant="contained" onClick={Back}>Back</Button>
                    <Button variant="contained" onClick={Logout}>Logout</Button>
                    
            </div> 
            <div className='GraphPage'>
                <h1>Your Graphs</h1>
                <img width='110%' src={graphImage}></img>
            </div>
        
            </div>
        </div>


    );
}

export default Protected;
