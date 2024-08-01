import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { useAuth2 } from "./AuthContext2";
import { LoadingContext } from "./LoadingContext";
const ResetPassword = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const [errors2, setErrors2] = useState("");
  const { setIsAuthenticated2 } = useAuth2();
  const [foundPassword, setFoundPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notFoundPassword, setnotFoundPassword] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
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
    } else if (
      userDetails.password.length < 8 ||
      userDetails.password.length > 8
    ) {
      validationErrors.password = "Password must be 8 charecters";
    }
    setErrors(validationErrors);

    try {
      startLoading();
      if (Object.keys(validationErrors).length === 0) {
        const { email, password } = userDetails;
        const res = await fetch(
          "https://data-orchard-server.onrender.com/resetPassword",
          {
            method: "PUT",
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

        if (data.password) {
          window.alert(
            `Successfully reset password. New password is ${data.password}`
          );
          setNewPassword(data.password);
        } else {
          window.alert("Something went wrong");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  const handleChangePassword = (e) => {
    setUserEmail(e.target.value);
  };
  const findUserPassword = async (e) => {
    e.preventDefault();
    let emailValidation = "";

    if (!userEmail.trim()) {
      emailValidation = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      emailValidation = "Invalid email";
    }

    setErrors2(emailValidation);
    if (emailValidation === "") {
      try {
        startLoading();
        const res = await fetch(
          "https://data-orchard-server.onrender.com/findPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              findPassword: userEmail,
            }),
          }
        );
        const data = await res.json();
        if (data.password) {
          setFoundPassword(data.password);
        } else {
          setnotFoundPassword("User not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <div id="register">
      <div className="navAdmin">
        <nav className="mainNav">
          <ul>
            <li>
              <span
                onClick={() => {
                  navigate("/admin");
                }}
                style={{ cursor: "pointer" }}
              >
                Admin Panel
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate("/usersReport");
                }}
                style={{ cursor: "pointer" }}
              >
                Users Report
              </span>
            </li>
            <li>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/adminUpdate");
                }}
              >
                Update
              </span>
            </li>
            <li>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/resetPassword");
                }}
              >
                Find/Reset
              </span>
            </li>
            <li>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsAuthenticated2(false);
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      >
        Find/Reset user password
      </h1>
      <div className="wrapper" style={{ minHeight: "650px" }}>
        <div className="form-box login">
          <form
            onSubmit={findUserPassword}
            style={{ marginBottom: "20px" }}
            className="findUserPassword"
          >
            <h2>Find Password</h2>
            <div className="input-box" style={{ marginBottom: "40px" }}>
              <FaEnvelope className="iconn" />
              <input
                placeholder="Enter Your Email"
                type="email"
                name="email"
                defaultValue={userEmail}
                onChange={handleChangePassword}
                autoComplete="off"
              />
              {errors2 && (
                <span>
                  {errors2}
                  <IoWarning className="warning" />
                </span>
              )}
              <label htmlFor="email">Email</label>
            </div>

            <button className="btn">Find Password</button>
            <div className="find-pass">
              {foundPassword && (
                <span>Desired Password is : {foundPassword}</span>
              )}
              {notFoundPassword && (
                <span> {foundPassword ? "" : notFoundPassword}</span>
              )}
            </div>
          </form>
          <h2>Reset Password</h2>
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
              <label htmlFor="password">New Password</label>
            </div>

            <button type="submit" className="btn">
              Reset Password
            </button>
            <div className="find-pass">
              {newPassword && <span>New Password is : {newPassword}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
