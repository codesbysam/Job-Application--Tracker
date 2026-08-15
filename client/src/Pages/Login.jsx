import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("All fields are required.");
      return;
    }

    try {
      // This calls our backend at POST /api/auth/login
      const data = await login(email, password);
      // Save the token so future requests (like fetching jobs) can use it
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setFormError("");
      navigate("/dashboard");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Welcome back!</h2>
        <p className="auth-subtitle">Sign in to manage your job applications</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label htmlFor="password" className="form-label" style={{ margin: 0 }}>
                Password
              </label>
              <a href="#" className="forgot-password" style={{ marginLeft: "auto" }}>
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="***********"
              value={password}
              onChange={handlePasswordChange}
              required
              className="form-input"
            />
          </div>
          {formError && (
            <div className="form-error">{formError}</div>
          )}
          <div style={{ marginTop: "2rem" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
              Sign In
            </button>
            <p className="auth-footer">
              Don't have an account?{" "}
              <Link to="/signup">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
