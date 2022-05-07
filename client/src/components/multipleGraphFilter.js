import Grid from '@mui/material/Grid';
import GraphFilter from './GraphFilter';



const multipleLocations = ({ location, onDelete, onClick }) => {
    return (
        <div>

            {

                location.map((loc, index) => (

                    <GraphFilter props={loc} onDelete={onDelete} onClick={onClick} />

                ))

            }
        </div>

    )


}

export default multipleLocations;