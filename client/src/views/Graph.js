import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import { experimentalStyled as styled } from '@mui/material/styles';

import Graph from '../components/Graph'


axios.defaults.headers.common['token'] = localStorage.getItem('token');



export default function GraphView() {

    //const navigate = useNavigate()

    function getGraphs() {
        const graphs = []
        axios.get('http://localhost:8080/graph' ).then( function(response){ 
            console.log(response)
            if(response.status === 200 && response.data.graphs){ 
                console.log(response.data.graphs);
                graphs.push(response.data.graphs)
                
            }
            
        }
        ).catch( (error)=> { 
            console.log(error)
            return false
        }
        )
        return graphs
    }



    const test = { title: "gay", type: 'ultraGay' }
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


    return (
        <div class="test"> 
        <h1>Your Graphs</h1> 
        {GenerateGraphElement()}
        </div>

    );


}
