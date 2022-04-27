import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Uploads()
{
    
    return (
        <div className="App">
            <header className="App-full">
            <button class="button-back" type="button" className="btn btn-success btn-lg">Back</button>
                <h1 className="m-4">
                   
                    Choose the graph to produce.
                </h1>
                <ul> 
                    <li>test</li>
                </ul> 
                    
                <button type="button" className="btn btn-success btn-lg"><Link to="/upload">Get started</Link></button>
            </header>
        </div>
    );
}

