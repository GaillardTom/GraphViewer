import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function NotFound() {

    const navigate = useNavigate();
    
    useEffect(() => {
        function onLoad() {
            navigate('/login');
        }
        onLoad();
    }, [navigate])

    return (
        <div className="App">
            <header className="App-full">
                <h1 className="m-4">
                    NotFound.
                </h1>
            </header>
        </div>
    );
}

export default NotFound;