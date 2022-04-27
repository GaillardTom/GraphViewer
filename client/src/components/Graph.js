
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




export default function Graph({ props, onDelete }) {

    return (
        
        <div className="Card">

                {console.log('PROPS', props)}
                <Grid className='GraphGrid' container spacing={2} columns={5}>
                    <Grid item xs={5}>
                        <Item>
                            {props.title}<span className="tab"></span>
                            {props.type}<span className="tab"></span>
                            {props.date}<span className="tab"></span>
                            <Button variant="contained">Open </Button><span className="tab"></span>
                            <DeleteIcon onClick={() => onDelete(props._id)} style={{ color: 'black', cursor: 'pointer' }} />
                        </Item>
                        
                        
                            
                    </Grid>
                </Grid>



        </div>
    )

}