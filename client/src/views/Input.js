import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GraphFilter from '../components/GraphFilter'
import axios from 'axios';
import {multipleLocations} from '../components/multipleGraphFilter'


export default function Input() {

    const [possLocation, setPossLocation] = useState([]);
    const [location, setLocation] = useState('');

    const navigate = useNavigate()
    const title = ""

    const returnToHome = () => {
        navigate('/upload')
    }
    const Clicked = (filter) => {
        console.log('filter: ', filter);



    }
    const handleChange = (event) => {
        //console.log('event: ', event.target.value);
        setLocation(event.target.value)
    }

    useEffect(() => {
        axios.defaults.headers.common['token'] = localStorage.getItem('token');

        const getLoc = async() => { 

            const ans = await fetchLocations();
            if(ans){ 
                console.log('ans: ', ans);

                setPossLocation(ans)
            }

        }
        const type = localStorage.getItem('type')

        console.log(":dsadas")
        if (type === 'bar') {
            document.getElementById("titleGraphName").innerHTML = 'Items sold per region'
        }
        else if (type === 'pie') {
            document.getElementById("titleGraphName").innerHTML = 'Gender per region'
        }
        else if (type === 'line') {
            document.getElementById("titleGraphName").innerHTML = 'Satisfaction per gender in a region'
        }
        else if (type === 'barh') {
            document.getElementById("titleGraphName").innerHTML = 'Age group per region'
        }; 
        
        getLoc()


    }, [])
    const fetchLocations = async() => { 

        const res = await axios.get('http://localhost:8080/locations').catch((response) => {
            console.log('res.status === 400: ', response);
            navigate('/login')
            return false
        })
        if (res.status == 200) {
            console.log('res: ', res.data);
            const data = await res.data
            console.log('data: ', data);
            return data
        }
    }








return (
    <div className="App">
        <div className="App-full">
            <div className="back">
                <button className="btn btn-primary" onClick={returnToHome} >Back</button>
            </div>
            <div className="titleGraph">
                <h1 id="titleGraphName" className="titleGraphName"></h1>
            </div>
            <div>
                <multipleLocations props={possLocation} onChange={handleChange} onClick={Clicked} />
                <GraphFilter props={possLocation} onChange={handleChange} onClick={Clicked} />

            </div>


        </div>
    </div>
);
}

