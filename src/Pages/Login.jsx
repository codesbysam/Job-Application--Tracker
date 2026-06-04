import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("All fields are required.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No user details found for this email.");
      return;
    }

    if (user.email === email && user.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    if (user.email === email && user.password === password) {
      setFormError("");
      navigate("/dashboard"); 
    } else {
      setFormError("Invalid email or password.");
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
