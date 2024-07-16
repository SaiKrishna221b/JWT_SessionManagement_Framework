import axios from "axios";
import React, { useContext, useState } from "react";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
    
      };

      console.log("Data being sent:", loginData);
      
      await axios.post(
        "http://localhost:5000/user/login",
        loginData
      );
     
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;