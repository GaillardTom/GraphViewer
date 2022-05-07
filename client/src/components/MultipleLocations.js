import Grid from '@mui/material/Grid';
import GraphFilter from './GraphFilter';
import Select from '@mui/material/Select';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';


export function MultipleLocations({ location, onChange, onClick, currentLoc, changeTitle }) {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (


        <div className="CreateNew">

            <input

                type="text"
                className="userTitle"
                placeholder="Enter Title"
                onChange={changeTitle}
            />

            <Item>
                <FormControl fullWidth >


                    <InputLabel id="demo-simple-select-label" width="100%">Locations</InputLabel>

                    {console.log('IMAGAYFORREAL', location)}

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentLoc}
                        label="Location"
                        onChange={onChange}

                    >
                        {location.map((loc) => {
                            return <MenuItem value={loc}>{loc}</MenuItem>
                        })}

                    </Select>

                    <Button variant="contained" onClick={onClick}>Create </Button>

                </FormControl>

            </Item>

        </div>






    )


}
