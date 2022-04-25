import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';

 function log()
{
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);

    if (username  !== "" && password !== "")
    {

    
   axios.post('http://localhost:8080/login', {
        username: username,
        password: password
}
).then(function (response) {
    console.log(response);
    console.log(response.data);
    console.log(response.data.token);
    localStorage.setItem('token', response.data.token);
    window.location.href = "/graph";
}
).catch(function (error) {
    alert(error);
}
);
    
}
else
{
    alert("Please fill all fields");
}
}
function Login() {
    
    return (
        <div className="App">
          
<div className="m-4">
  <label>Username:</label>
  <input
  id="username"
    type="username"
    className="m-4"
    placeholder="Enter username"
  />
</div>    
<div className="m-4">
          <label>Password:</label>
          <input
          id="password" 
            type="password"
            className="m-4"
            placeholder="Enter password"
          />
           <p className="forgot-password text-right">
  Forgot <a href="#">password?</a>
</p>
        </div> 
        <div className="m-4">
  <button type="submit" className="btn btn-primary" onClick={log}>
    Submit
  </button>
 
</div>

        </div>




    );
}

export default Login;
