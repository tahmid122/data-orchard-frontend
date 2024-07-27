import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { useAuth2 } from "./AuthContext2";
import { IoWarning } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import MainNav from "./MainNav";
import { LoadingContext } from "./LoadingContext";
const Login = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated2 } = useAuth2();
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
          "https://data-orchard-server.onrender.com/adminLogin",
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
        if (data === true) {
          setIsAuthenticated2(data);
          navigate("/admin");
        } else {
          window.alert("Invalid Information, Please re-check");
          setIsAuthenticated2(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      stopLoading();
    }
  };
  return (
    <div id="register">
      <MainNav />
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      >
        Welcome to Data Orchard, Admin
      </h1>
      <div
        className="wrapper"
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          padding: "5px",
        }}
      >
        <div className="back">
          <span
            onClick={() => {
              navigate(`/`);
            }}
          >
            <FaArrowLeftLong />
            Go Back
          </span>
        </div>
        <div className="form-box login">
          <h2>Admin Login</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="input-box">
              <FaEnvelope className="iconn" />
              <input
                placeholder="Enter Your Email"
                type="email"
                name="email"
                defaultValue={userDetails.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span>
                  {errors.email}
                  <IoWarning className="warning" />
                </span>
              )}
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-box">
              <FaLock className="iconn" />
              <input
                placeholder="Enter Your Password"
                type="password"
                name="password"
                defaultValue={userDetails.password}
                onChange={handleChange}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
