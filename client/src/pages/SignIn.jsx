import React, { useState } from "react";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

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
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
            />
          </div>
          <button>{loading ? "Signing you in" : "Login"}</button>
        </form>
        <p className="login">
          Do not have an account?{" "}
          <Link to="/signup" className="sign-up">
            <span>Signup here</span>
          </Link>
        </p>
        <p className="forerror">{error && error}</p>
      </div>
    </div>
  );
}
