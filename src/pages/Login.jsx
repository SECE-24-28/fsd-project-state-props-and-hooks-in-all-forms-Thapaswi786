import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const CREDENTIALS = {
  student: { email: "student@college.edu", password: "student123", name: "Student User" },
  teacher: { email: "teacher@college.edu", password: "teacher123", name: "Teacher User" },
  admin: { email: "admin@college.edu", password: "admin123", name: "Admin User" }
};

const ROLE_ICONS = { student: "🎓", teacher: "👨‍🏫", admin: "🛡️" };
const ROLE_LABELS = { student: "Student", teacher: "Teacher", admin: "Admin" };

function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = CREDENTIALS[role];

      if (email === user.email && password === user.password) {
        const loginData = {
          name: user.name,
          email: user.email,
          role: role,
          isLoggedIn: true
        };

        localStorage.setItem("loginData", JSON.stringify(loginData));
        sessionStorage.setItem("loginData", JSON.stringify(loginData));

        console.log("Login Name:", loginData.name);
        console.log("Login Role:", loginData.role);

        if (onLogin) {
          onLogin(loginData);
        }

        navigate(`/${role}-dashboard`, { state: loginData });
      } else {
        setError("Invalid email or password. Please check and try again.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <main className="page form-wrap">
      <PageTitle title="Login" />

      <div className="form-card">
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <div
            style={{
              fontSize: "2.6rem",
              marginBottom: "10px",
              width: "68px",
              height: "68px",
              borderRadius: "18px",
              background: "linear-gradient(135deg,var(--secondary-light),var(--secondary))",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 12px"
            }}
          >
            {ROLE_ICONS[role]}
          </div>

          <h2>Portal Login</h2>
          <p>Sign in to your college portal account</p>
        </div>

        <div className="role-tabs">
          {["student", "teacher", "admin"].map((r) => (
            <button
              key={r}
              className={role === r ? "active" : ""}
              onClick={() => handleRoleChange(r)}
              type="button"
            >
              {ROLE_ICONS[r]} {ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <div
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: "12px",
            padding: "10px 14px",
            marginBottom: "18px",
            fontSize: "0.83rem",
            color: "var(--muted)"
          }}
        >
          <strong style={{ color: "var(--secondary)" }}>Demo credentials — </strong>
          Email: <code style={{ color: "var(--secondary-light)" }}>{CREDENTIALS[role].email}</code>
          {" | "}
          Password: <code style={{ color: "var(--secondary-light)" }}>{CREDENTIALS[role].password}</code>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={CREDENTIALS[role].email}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: "48px" }}
              />

              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "var(--muted)"
              }}
            >
              <input type="checkbox" style={{ width: "auto", marginRight: "0" }} />
              Remember me
            </label>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="main-btn" disabled={loading}>
            {loading ? "Signing in..." : `Sign In as ${ROLE_LABELS[role]}`}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "var(--muted)"
          }}
        >
          Need help?{" "}
          <Link
            to="/contact"
            style={{ color: "var(--secondary-light)", textDecoration: "none" }}
          >
            Contact Support
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;