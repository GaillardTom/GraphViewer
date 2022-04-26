import Graph from './Graph'
import Grid from '@mui/material/Grid';


const Graphs = ({ graphs, onDelete }) => {
    return (
        <ul>
            {graphs.map((graph, index) => (
                    <Graph key={index} props={graph} onDelete={onDelete} />

            ))}
        </ul>

    )
}

export default Graphs;