import React, { useState } from "react";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  siginStart,
  siginSuccess,
  signinFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(siginStart());
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(siginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error.message));
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
