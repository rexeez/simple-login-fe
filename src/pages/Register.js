import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../UserProfile';

function Register() {

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

    async function registerUser(){
        fetch('http://localhost:8080/register', {
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
            if (response.status == 400){
                alert("Username already exists");
                throw new Error(response.status);
            } else if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(data => {
            console.log(inputs.username + " registered");
            window.location.href = '/';
        })
        .catch(error => console.error(error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }


    return (
        <div className="App">
        <header className="App-header">
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input name="username" maxLength="16" onChange={handleChange}></input>
                <br></br>
                <label>Password</label>
                <input type="password" name="password" maxLength="20" onChange={handleChange}></input>
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <p>
            Already have an account? Login <a
                className="App-link"
                href="/"
            >
                here
            </a>.
            </p>
            
        </header>
        </div>
    );
}

export default Register;
