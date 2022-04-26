import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'


export default function Uploads() {

    const navigate = useNavigate()

    const returnToHome = () => {
        navigate('/graphs')
    }

    const sendToInput = () => {
        navigate('/input')
    }

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }


    return(
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
                
            </header>
          <body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card" id='card1'>
                                <div className="card-body" onClick={sendToInput}>
                                 
                                    
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                       
                            <div className="card" id='card4' onClick={sendToInput}>
                            
                                <div className="card-body">
                                
                                   
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card" id='card3' onClick={sendToInput}>
                                <div className="card-body" >
                                    
                                    
                                   
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">

                            <div className="card" id='card2' onClick={sendToInput}>
                                <div className="card-body" >
                                    
                                   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </body>
        </div>
    );
}