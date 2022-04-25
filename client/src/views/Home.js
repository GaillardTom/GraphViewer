import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Home() {
    
    return (
        <div className="App">
            <header className="App-full">
                <h1 className="m-4">
                    Welcome to Graph Viewer.
                </h1>
                <ul> 
                    <li>test</li>
                </ul> 
                    
                <button type="button" className="btn btn-success btn-lg"><Link to="/upload">Get started</Link></button>
            </header>
        </div>
    );
}

export default Home;
