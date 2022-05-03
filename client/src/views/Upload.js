import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function Uploads() {

    const navigate = useNavigate()

    const returnToHome = () => {
        navigate('/graphs')
    }

    const sendToInput = function (type) {
        localStorage.removeItem('type')
        localStorage.setItem('type', type)
        navigate('/input')
    }

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }


    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: 'auto',
        maxHeight: 'auto',
      });

    return (
        <div className="App">
            <header className="App-full">
                <h1 className="App-header">
                    Choose the graph to produce.
                </h1>
                <div className="back">
                    <button className="btn btn-primary" onClick={returnToHome} >Back</button>
                </div>
                <div className="Logout">
                    <button className='btn btn-primary' onClick={Logout}>Log out</button>
                </div>

                <Box sx={{ width: '100%' }}>
                    <Grid justifyContent="center" alignItems="center" container rowSpacing={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid Img xs="auto">
                            <Img>
                                <div className="card1">
                                    <div className="card-body" onClick={() => sendToInput('bar')}>



                                    </div>
                                </div>

                            </Img>
                        </Grid>
                        <Grid Img xs="auto">
                            <Img>

                                <div className="card4">

                                    <div className="card-body" onClick={() => sendToInput('pie')}>

                                    </div>
                                </div>

                            </Img>
                        </Grid>
                        <Grid Img xs="auto">
                            <Img>

                                <div className="card3" onClick={sendToInput}>
                                    <div className="card-body" onClick={() => sendToInput('line')}>

                                    </div>
                                </div>
                            </Img>
                        </Grid>
                        <Grid Img xs="auto">
                            <Img className='card2'>
                            <div className="card2">
                                <div className="card-body" onClick={() => sendToInput('barh')}>



                                </div>
                            </div>


                            </Img>
                        </Grid>
                    </Grid>
                </Box>
            </header>
        </div >
    );
}