import React, { useContext, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { IoWarning } from "react-icons/io5";
import { useAuth2 } from "./AuthContext2";
import { LoadingContext } from "./LoadingContext";
const AdminUpdate = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const { setIsAuthenticated2 } = useAuth2();
  const navigate = useNavigate();
  const [userDetails2, setUsersDetails2] = useState({
    oldEmail: "",
    newEmail: "",
    password: "",
  });
  const handleChange = (e) => {
    setUsersDetails2({ ...userDetails2, [e.target.name]: e.target.value });
  };
  const handleSubmits = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!userDetails2.oldEmail.trim()) {
      validationErrors.oldEmail = "Old Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails2.oldEmail)) {
      validationErrors.oldEmail = "Invalid email";
    }
    if (!userDetails2.newEmail.trim()) {
      validationErrors.newEmail = "New Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails2.newEmail)) {
      validationErrors.newEmail = "Invalid email";
    }
    if (!userDetails2.password.trim()) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);

    try {
      startLoading();
      if (Object.keys(validationErrors).length === 0) {
        const { oldEmail, newEmail, password } = userDetails2;
        const res = await fetch(
          "https://data-orchard-server.onrender.com/admin",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              oldEmail,
              newEmail,
              password,
            }),
          }
        );
        const data = await res.json();
        if (data.email) {
          console.log("ok");
          window.alert("Successfully Updated");
          setIsAuthenticated2(false);
          navigate("/admin");
        } else {
          window.alert("Something Went Wrong");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  return (
    <div>
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
      <div className="adminUpdate">
        <div className="form-box login">
          <h2>Admin Update</h2>
          <form onSubmit={handleSubmits} method="PUT">
            <div className="input-box" style={{ marginTop: "40px" }}>
              <FaEnvelope className="iconn" />
              <input
                placeholder="Enter Your oldEmail"
                type="email"
                name="oldEmail"
                defaultValue={userDetails2.oldEmail}
                onChange={handleChange}
              />
              {errors.oldEmail && (
                <span>
                  {errors.oldEmail}
                  <IoWarning className="warning" />
                </span>
              )}
              <label htmlFor="oldEmail">Old Email</label>
            </div>
            <div className="input-box" style={{ marginTop: "40px" }}>
              <FaEnvelope className="iconn" />
              <input
                placeholder="Enter Your newEmail"
                type="email"
                name="newEmail"
                defaultValue={userDetails2.newEmail}
                onChange={handleChange}
              />
              {errors.newEmail && (
                <span>
                  {errors.newEmail}
                  <IoWarning className="warning" />
                </span>
              )}
              <label htmlFor="newEmail">New Email</label>
            </div>

            <div className="input-box" style={{ marginTop: "40px" }}>
              <FaLock className="iconn" />
              <input
                placeholder="Enter Your Password"
                type="password"
                name="password"
                defaultValue={userDetails2.password}
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
              Update Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
