import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GraphFilter from '../components/GraphFilter'
import axios from 'axios';
import { MultipleLocations } from '../components/MultipleLocations';

export default function Input() {

    const [possLocation, setPossLocation] = useState([]);
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate()
    
    const returnToHome = () => {
        navigate('/upload')
    }
    const Clicked = async() => {
        if(location !== "" ){ 
            //MAKE API CALL TO SERVER CREATE GOOD GRAPH WITH TITLE AND SHIT 
            console.log('filter: ', location);
            alert('Graph Created')

            await CreateNewGraph()
        }        
    }

    const CreateNewGraph = async() => { 
        const type = localStorage.getItem('type')

        if(type === 'line'){ 
            const req = await axios.post('http://localhost:8080/graph/lineGraph',{"filter": location, "title": title})
            console.log('req: ', req);
            if(req.status === 200){ 
                console.log(req.data)
                const graphID = req.data.data
                const path = `/${graphID}.png`
                console.log('path: ', path);

                localStorage.setItem('graphLocation', path)
                navigate('/graphimage')

            }
        }else if (type ===  'pie'){ 
            const req = await axios.post('http://localhost:8080/graph/pieGraph', {"filter": location, "title": title})
            console.log('req: ', req);
            if(req.status === 200){ 
                console.log(req.data.data)
                const graphID = req.data.data
                const path = `/${graphID}.png`
                console.log('path: ', path);

                localStorage.setItem('graphLocation', path)
                navigate('/graphimage')
            }
        }else if (type === 'bar'){ 
            const req = await axios.post('http://localhost:8080/graph/columnGraph', {"filter": location, "title": title})
            console.log('req: ', req);
            if(req.status === 200){ 
                console.log(req.data.data)
                const graphID = req.data.data
                const path = `/${graphID}.png`
                console.log('path: ', path);

                localStorage.setItem('graphLocation', path)
                navigate('/graphimage')
            }
        }else if(type ==='barh'){ 
            const req = await axios.post('http://localhost:8080/graph/barGraph', {"filter": location, "title": title})
            console.log('req: ', req);
            if(req.status === 200){ 
                console.log(req.data.data)
                const graphID = req.data.data
                const path = `/${graphID}.png`
                console.log('path: ', path);

                localStorage.setItem('graphLocation', path)
                navigate('/graphimage')
            }
        }



    }
    const handleChange = (event) => {
        //console.log('event: ', event.target.value);
        setLocation(event.target.value)
    }

    useEffect(() => {
        axios.defaults.headers.common['token'] = localStorage.getItem('token');
        

        const fetchLocations = async() => { 

            const ans = await fetchLocationsFromDB();
            if(ans){ 
                console.log('ANs', ans)
                setPossLocation(ans)
                console.log('test',possLocation)
            }

        }
        fetchLocations()
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
        }


    }, [])
    const fetchLocationsFromDB = async() => { 

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

    const changeUserTitle = (e) => { 
        setTitle(e.target.value)
        console.log(e.target.value)
    }






return (
    <div className="App">
        <div className="App-full">
            <div className="Nav-bar-Logout">
                <button className="btn btn-primary" onClick={returnToHome}> Back</button>
            </div>
            <div className="titleGraph">
                <h1 id="titleGraphName" className="titleGraphName"></h1>
            </div>
            <div>
                <MultipleLocations currentLoc={location} location={possLocation} onChange={handleChange} onClick={Clicked} changeTitle={changeUserTitle} />
            </div>


        </div>
    </div>
);
}

