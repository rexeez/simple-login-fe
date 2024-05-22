import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../UserProfile';

function Login() {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  useEffect(() => {
    if (UserProfile.getName()){
      window.location.href = '/welcome';
    }
  })

  async function loginUser(){
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        body: JSON.stringify({
            username: inputs.username,
            password: inputs.password,
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);
    })
    .then(data => {
        UserProfile.setName(data.username);
        window.location.href = '/welcome';
    })
    .catch(error => console.error(error));
}

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input name="username" maxLength="16" onChange={handleChange}></input>
          <br></br>
          <label>Password</label>
          <input type="password" name="password" maxLength="20" onChange={handleChange}></input>
          <button type="submit">Login</button>
        </form>
        <br></br>
        <p>
          Don't have an account? Register <a
            className="App-link"
            href="/register"
          >
            here
          </a>.
        </p>
        
      </header>
    </div>
  );
}

export default Login;
