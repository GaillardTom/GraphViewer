import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Home() {
    
    
    return (
        <div className="App">
            <header className="App-full">
                
                <h1 className="m-4">
                <div className="GraphViewergraphsh1" >
                    Welcome to Graph Viewer.
                    
                </div>
                </h1>
                
                
                <div className="Log"> 

                    <button type="button" className="btn btn-success btn-lg"><Link to="/register">Get Registered</Link> </button>
                
                    <button type="button" className="btn btn-success btn-lg"><Link to="/login">Get Login</Link></button>
                    <button type="button" className="btn btn-success btn-lg"><Link to="/graphs">View Graphs</Link></button>
                </div>
            </header>
        </div>
    );
}

export default Home;
