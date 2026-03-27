import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/Auth.css";
import { getReadableError } from "../utils/error";
import { setStoredUser } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await loginUser(form);
      setStoredUser(user);
      navigate(user.role === "STORE_OWNER" ? "/owner" : "/user");
    } catch (err) {
      setError(getReadableError(err, "Unable to log in. Please check your email and password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-copy">
          <span className="auth-badge">Offer Hunt</span>
          <h1>Find the best nearby deals in one place.</h1>
          <p>
            Users can discover active shop offers around them, while store owners can manage shops
            and promotions from a focused dashboard.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>
          <p>Sign in to continue to your dashboard.</p>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

          <div className="auth-footer">
            <span>New to Offer Hunt?</span>
            <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
