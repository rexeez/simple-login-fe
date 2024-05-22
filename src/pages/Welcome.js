import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../UserProfile';

function Welcome() {

  useEffect(() => {
    if (!UserProfile.getName()){
      window.location.href = '/';
    }
  })

  function logout(){
    fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        }
    })
    .then(response => {
        if (response.ok) {
            UserProfile.reset();
            window.location.href = '/';
        }
        throw new Error(response.status);
    })
    .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <label>{UserProfile.getName()}</label>
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default Welcome;
