import React, { useState } from "react";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false)
      setError(null)

      navigate('/signin')

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };

  console.log(formData);

  return (
    <div className="signup">
      <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <input
              type="text"
              placeholder="Your name"
              id="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              required
            />
          </div>
          <button>{loading? "Signing you up":"Sign up"}</button>
        </form>
        <p className="login">
          Already have an account?{" "}
          <Link to="/signin" className="sign-in">
            <span>Login here</span>
          </Link>
        </p>
        
          <p className="error-para">{error&&error}</p>
        
      </div>
    </div>
  );
}
