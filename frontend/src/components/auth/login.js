import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };

      console.log("Data being sent:", registerData);

      await axios.post(
        "http://localhost:5000/user/register",
        registerData,
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  }

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div style={darkTheme ? styles.containerDark : styles.container}>
      <div style={styles.themeSwitcher}>
        <label style={styles.switch}>
          <input type="checkbox" onChange={toggleTheme} />
          <span style={styles.slider}></span>
        </label>
      </div>
      <h1 style={darkTheme ? styles.titleDark : styles.title}>Register a new account</h1>
      <form onSubmit={register} style={darkTheme ? styles.formDark : styles.form}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={darkTheme ? styles.inputDark : styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          style={darkTheme ? styles.inputDark : styles.input}
        />
        <input
          type="password"
          placeholder="Verify your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
          style={darkTheme ? styles.inputDark : styles.input}
        />
        <button type="submit" style={darkTheme ? styles.buttonDark : styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff', // AliceBlue
    color: '#333',
  },
  containerDark: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#333',
    color: '#f0f8ff', // AliceBlue
  },
  themeSwitcher: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#ccc',
    transition: '.4s',
    borderRadius: '34px',
  },
  sliderBefore: {
    position: 'absolute',
    content: '""',
    height: '26px',
    width: '26px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
  },
  sliderChecked: {
    backgroundColor: '#2196F3',
  },
  sliderBeforeChecked: {
    transform: 'translateX(26px)',
  },
  title: {
    marginBottom: '20px',
    color: '#4682b4', // SteelBlue
  },
  titleDark: {
    marginBottom: '20px',
    color: '#f0f8ff', // AliceBlue
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff', // White
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formDark: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#444', // Darker background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inputDark: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #666',
    backgroundColor: '#666', // Darker input background
    color: '#fff', // Light text color
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4682b4', // SteelBlue
    color: '#fff',
    cursor: 'pointer',
  },
  buttonDark: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#5A9', // Slightly different color for button
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Register;
