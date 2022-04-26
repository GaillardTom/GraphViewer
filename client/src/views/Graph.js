import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';

import Graph from '../components/Graph'
import Graphs from "../components/Graphs"


axios.defaults.headers.common['token'] = localStorage.getItem('token');


export default function GraphView() {

    //const navigate = useNavigate()
    const [graphs, setGraphs] = React.useState([])


    React.useEffect(() => {

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
    const DeleteGraphServer = async(graphID) => { 
        console.log('graphID: ', graphID._id);
        const res = await axios.delete("http://localhost:8080/graph/" + graphID._id)
        console.log('res: ', res);
        if(res.status === 200){ 
            return true
        }
        else{ 
            return false
        }

    }

    //Delete Graph 
    const deleteGraph = async(graphID) => {
        const graph = graphs.find((graph) => graph._id === graphID)
        console.log('graph: ', graph);
        if(await DeleteGraphServer(graph)){
            setGraphs(graphs.filter((graph) => graph._id !== graphID))

        }else{ 
            alert("ERROR")
        }

    }

    const test = { title: "gay", type: 'ultraGay' }
    /*
    const GenerateGraphElement = async() => {
        const graphs = getGraphs()
        console.log('graphs: ', graphs);
        const graphElement =  graphs.map(((graph) => {
            return (
                <Graph title={graph.title} type={graph.type} date={graph.date} graphLocation={graph.graphLocation} />
            )
        }));
        return graphElement
    };
    */
    function RedirectToUploads() { 
        useNavigate('/uploads')
    }

    return (
        <div className="GraphDiv">
            <h1>Your Graphs</h1>
            <div className='CreateNewButton'> 
            <Button variant="contained" href="/upload">Create New</Button>
            </div>
            {graphs.map((graph) => {
                console.log('graphTitle: ', graph.title);

            })}
            {graphs.length > 0 ? (
                <Graphs graphs={graphs} onDelete={deleteGraph} />

            ) :            <div className='NoGraphText'> 
                                    No Graphs To Show
                            </div> 
            }
        </div>

    );


}
