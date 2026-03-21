import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // ✅ FIXED API URL
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password
        }
      );

      const user = res.data;

      if (!user || !user.role) {
        alert("Invalid login response");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful!");

      // ✅ safer role check
      if (user.role.toUpperCase() === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/home");
      }

    } catch (error) {

      console.error(error);

      // ✅ Show real backend error
      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;