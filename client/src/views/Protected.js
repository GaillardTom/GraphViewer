import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Protected() {
    
    return (
        <div className="App">
            <header className="App-full">
                <h1 className="m-4">
                    Welcome to a Protected view.
                </h1>
                <img src={logo} className="App-logo m-3" alt="logo" />
            </header>
        </div>
    );
}

export default Protected;
