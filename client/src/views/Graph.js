import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import Graphs from "../components/Graphs"




export default function GraphView() {

    //const navigate = useNavigate()
    const [graphs, setGraphs] = React.useState([])
    const navigate = useNavigate()

    React.useEffect(() => {
        axios.defaults.headers.common['token'] = localStorage.getItem('token');

        const getGraphs = async () => {
            const GraphsFromServer = await fetchGraphs()
            setGraphs(GraphsFromServer)

        }
        getGraphs()
    }, [])
    // Fetch Graphs From server
    const fetchGraphs = async () => {
        const res = await axios.get('http://localhost:8080/graph')
        console.log('res: ', res.data.graphs);
        const data = await res.data.graphs
        console.log('data: ', data);
        return data
    }

    //Delete Graph from api 
    const DeleteGraphServer = async (graphID) => {
        console.log('graphID: ', graphID._id);
        const res = await axios.delete("http://localhost:8080/graph/" + graphID._id)
        console.log('res: ', res);
        if (res.status === 200) {
            return true
        }
        else {
            return false
        }

    }

    //Delete Graph 
    const deleteGraph = async (graphID) => {
        const graph = graphs.find((graph) => graph._id === graphID)
        console.log('graph: ', graph);
        if (await DeleteGraphServer(graph)) {
            setGraphs(graphs.filter((graph) => graph._id !== graphID))
            alert('Graph Deleted')
        } else {
            alert("ERROR")
        }

    }

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }



    return (

        <div className="App">
            <div className="Nav-bar">
                
            </div>
            <div className='Nav-bar-Logout'>

                    <Button variant="contained" onClick={Logout}>Logout</Button>

            </div>

            <div className="GraphPage">
                <div className='CreateNewButton'>
                    <h1 className="titleGraph">Your Graphs</h1>
                    <Button variant="contained" href="/upload">Create New</Button>
                </div>
                {graphs.length > 0 ? (
                    <Graphs graphs={graphs} onDelete={deleteGraph} />

                ) : <div className='NoGraphText'>
                    No Graphs To Show
                </div>
                }
            </div>




        </div>


    );


}
