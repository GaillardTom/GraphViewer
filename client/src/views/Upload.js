import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


import PiePic from '../assets/pie.png';
import BarPic from '../assets/bar.png';
import LinePic from '../assets/line.png';
import BarhPic from '../assets/barh.png';

export default function Uploads() {

    
    const navigate = useNavigate()

    const returnToHome = () => {
        navigate('/graphs')
    }

<<<<<<< HEAD
    const navigateToInput = () => {
=======
    const sendToInput = function (type) {
        localStorage.removeItem('type')
        localStorage.setItem('type', type)
>>>>>>> 1f3dded7348c4e8ce802b9e84b7b9a4ecf7f782c
        navigate('/input')
    }

    function send(type)
    {
        localStorage.removeItem('type')
        localStorage.setItem('type', type)
        navigateToInput()
    }
    

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }


    const Img = styled('img')({
        margin: 'auto',
        display: 'flex',

        maxWidth: '70%',
        maxHeight: '90%',
        width: '500px',
        height: '350px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%',
        marginBottom: '20px',
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
<<<<<<< HEAD
                
            </header>
          <body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card" id='card1'>
                                <div className="card-body" onClick={send('bar')}>
                                 
                                    
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                       
                            <div className="card" id='card4'>
=======
                <div className="cardHolder">
                    <Grid    
justifyContent="center" alignItems="center" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }} columns={2}>
                        
                    <div className="">
                        <Grid>
>>>>>>> 1f3dded7348c4e8ce802b9e84b7b9a4ecf7f782c
                            
                                
                              <Img className="card-body" onClick={() => sendToInput('bar')}  src={BarPic} alt="Bar Graph"></Img>
                                

                            
                        </Grid>
                    </div>
                        <Grid>
                          

                                <div className="card4">

                                      <Img className="card-body" onClick={() => sendToInput('pie')} src={PiePic} alt="Pie Graph">
                                      </Img>

                                
                                </div>
<<<<<<< HEAD
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card" id='card3' >
                                <div className="card-body" >
                                   
                                </div>
                            </div>
                        </div>
=======
>>>>>>> 1f3dded7348c4e8ce802b9e84b7b9a4ecf7f782c

                        </Grid>
                        <Grid>

                                <div className="card3">
                                    <Img className="card-body"  onClick={() => sendToInput('line')} src={LinePic} alt="Line Graph">
                                    </Img>


<<<<<<< HEAD
                            <div className="card" id='card2' >
                                <div className="card-body" >
                                    
                                   
                                    
=======
>>>>>>> 1f3dded7348c4e8ce802b9e84b7b9a4ecf7f782c
                                </div>
                        </Grid>
                        <Grid>
                            <div className='card2'>
                                <Img className="card-body" onClick={() => sendToInput('barh')} src={BarhPic} alt="Barh Graph">





                                </Img>
                            </div>

                        </Grid>
                    </Grid>
                    </div>
            </header>
        </div >
    );
}

