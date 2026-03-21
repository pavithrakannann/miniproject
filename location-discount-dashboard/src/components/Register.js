import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role
    };

    try {

      const res = await axios.post(
        "http://localhost:8080/api/users/register", // ✅ FIXED
        userData
      );

      console.log(res.data);

      alert("Registered Successfully!");
      navigate("/login");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Registration Failed");
      }

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

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

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="OWNER">Store Owner</option>
          </select>

          <button type="submit">Register</button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;