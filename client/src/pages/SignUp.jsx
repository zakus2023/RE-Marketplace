import React from "react";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="signup">
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="login-fields">
          <input type="text" placeholder="Your name" id="username" />
          <input type="email" placeholder="Your Email" id="email" />
          <input type="password" placeholder="Password" id="password" />
        </div>
        <button>Continue</button>
        <p className="login">
          Already have an account? <Link to="/signin" className="sign-in"><span>Login here</span></Link>
        </p>
        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}
