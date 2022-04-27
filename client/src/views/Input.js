import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


export default function Input() {

    const navigate = useNavigate()
    const title = ""

    const returnToHome = () => {
        navigate('/graphs')
    }

    function SetTitle() 
    {
        useEffect(() => {
        const type = localStorage.getItem('type')
     
        console.log(":dsadas")
        if(type === 'bar'){
            document.getElementById("titleGraphName").innerHTML = 'Items sold per region'
            }
        else if(type === 'pie'){
            document.getElementById("titleGraphName").innerHTML = 'Gender per region'
        }
        else if(type === 'line'){
            document.getElementById("titleGraphName").innerHTML = 'Satisfaction per gender in a region'
        }
        else if(type === 'barh'){
            document.getElementById("titleGraphName").innerHTML = 'Age group per region'
        }
      })
    }
    


    

   
    
    return (
        <div className="App">
            <header className="App-full">
            <div className="back">
                <button className="btn btn-primary" onClick={returnToHome} >Back</button>
                </div>
                <div className="titleGraph">
                <h1  id="titleGraphName"className="titleGraphName">
                    {SetTitle}
                </h1>
                </div>
                <h1 className="m-4">
                    Welcome to a Protected view.
                </h1>
                
            </header>
        </div>
    );
}

