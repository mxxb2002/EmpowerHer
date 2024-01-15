//src/App.js
import React from 'react';

function App() {
  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:3005/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Mtops',
          password: 'empower',
          email: 'mashmaish@gmail.com',
          name: 'Maisha Begum',
          dob: '2002-03-19',
          role: 'Admin',
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>React Frontend</h1>
      <button onClick={registerUser}>Register User</button>
    </div>
  );
}

export default App;
