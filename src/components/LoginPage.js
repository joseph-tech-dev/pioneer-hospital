import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../styles/LoginPage.css"; // Import the CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS!

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const validate=()=>{
    let result = true;
    if(username==="" || password===null){
      toast.warning("Please enter username");
      result = false;
    }
    if (password==="" || password===null){
      toast.warning("Please enter password");
      result = false;
    }
    return result;
  }
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()){
      console.log("Login form submitted");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/core/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token in localStorage or context (for this example, localStorage)
        localStorage.setItem("authToken", data.token);

        // Call onLogin to update the state in App.js and set the user as logged in
        onLogin();

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      } else {
        // Handle error
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
