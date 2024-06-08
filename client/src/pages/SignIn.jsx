import React, { useState } from "react";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";

export default function SignIn() {
  
  return (
    <div className="signin">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
          <input type="email" placeholder="Your Email" id="email" />
          <input type="password" placeholder="Password" id="password" />
        </div>
        <button>Login</button>
        <p className="login">
          Do not have an account? <Link to="/signup" className="sign-up"><span>Signup here</span></Link>
        </p>
        
      </div>
    </div>
  );
}
