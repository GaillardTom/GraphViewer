import Graph from './Graph'
import Grid from '@mui/material/Grid';


const Graphs = ({ graphs, onDelete , onClick}) => {
    return (
        <ul>
            {graphs.map((graph, index) => (
                    <Graph key={index} props={graph} onDelete={onDelete} onClick={onClick} />

            ))}
        </ul>

    )
}

export default Graphs;