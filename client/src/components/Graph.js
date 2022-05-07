
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Graph({ props, onDelete, onClick}) {

    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
    return (
        
        <div className="Card">

                {console.log('PROPS', props)}
                <Grid className='GraphGrid' container spacing={2} columns={5}>
                    <Grid item xs={5}>
                        <Item>
                            <img width="200" height="150" src={`http://localhost:8080/static${props.graphLocation}`}></img>
                            {props.title}<span className="tab"></span>
                            {props.type}<span className="tab"></span>
                            {new Date(props.date).toDateString() + " " + new Date(props.date).getHours() + ":" + addZero(new Date(props.date).getMinutes()) + ":" + addZero(new Date(props.date).getSeconds())}<span className="tab"></span>
                            <Button variant="contained" onClick={()=> { 
                                localStorage.setItem('graphLocation', props.graphLocation)
                                onClick(props.graphLocation)
                            
                            }}>Open </Button><span className="tab"></span>
                            <DeleteIcon onClick={() => onDelete(props._id)} style={{ color: 'gray', cursor: 'pointer' }} />
                        </Item>
                    </Grid>
                </Grid>



        </div>
    )

}