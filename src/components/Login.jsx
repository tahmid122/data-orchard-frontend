import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { IoWarning } from "react-icons/io5";
import MainNav from "./MainNav";
import { LoadingContext } from "./LoadingContext";

const Login = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [userDetails, setUsersDetails] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setUsersDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!userDetails.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      validationErrors.email = "Invalid email";
    }
    if (!userDetails.password.trim()) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);

    try {
      if (Object.keys(validationErrors).length === 0) {
        const { email, password } = userDetails;
        startLoading();
        const res = await fetch(
          "https://data-orchard-server.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await res.json();
        const userName = await data.userName;

        if (userName) {
          setIsAuthenticated(true);
          navigate(`/users/${userName}`);
        } else {
          window.alert(
            "We didn’t find an account with those login credentials"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="hello">
      <MainNav />
      <div id="register">
        <h1
          style={{
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
            letterSpacing: "5px",
          }}
        >
          Welcome to Data Orchard
        </h1>
        <div className="wrapper">
          <div className="form-box login">
            <h2>Login</h2>
            <form method="POST" onSubmit={handleSubmit} autoComplete="off">
              <div className="input-box" style={{ marginBottom: "40px" }}>
                <FaEnvelope className="iconn" />
                <input
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  id="eamill"
                  defaultValue={userDetails.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.email && (
                  <span>
                    {errors.email}
                    <IoWarning className="warning" />
                  </span>
                )}
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-box" style={{ marginBottom: "40px" }}>
                <FaLock className="iconn" />
                <input
                  placeholder="Enter Your Password"
                  type="password"
                  name="password"
                  id="passwordd"
                  defaultValue={userDetails.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.password && (
                  <span>
                    {errors.password}
                    <IoWarning className="warning" />
                  </span>
                )}
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit" className="btn">
                Login
              </button>

              <div className="login-register">
                <p>
                  Don't have an account?
                  <Link to="/register" className="register-link">
                    Register
                  </Link>
                </p>
                <p>
                  <Link to="/forgetPassword" className="register-link">
                    Forget password?
                  </Link>
                </p>
              </div>
              <div className="login-register">
                <p>
                  <Link to="/adminLogin" className="register-link">
                    Admin Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
