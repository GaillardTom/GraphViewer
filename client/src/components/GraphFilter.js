
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import {MultipleLocations} from './MultipleLocations'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Graph({ location, onChange, onClick }) {

    
    return (

        <div className="Card">

            <Grid className='GraphGrid' container spacing={2} columns={5}>
                <Grid item xs={5}>
                    <Item>
                        <FormControl fullWidth>


                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            
                            <MenuItem value={location}>{location}</MenuItem>
                            <MultipleLocations props={location} onChange={onChange} />
                            <Button variant="contained" onClick={() => {
                                localStorage.setItem('graphLocation', location.graphLocation)
                                onClick()

                            }}>Create </Button><span className="tab"></span>
                        </FormControl>

                    </Item>
                </Grid>
            </Grid>



        </div>
    )

}