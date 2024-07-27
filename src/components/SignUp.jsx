import React, { useContext, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaVault } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import MainNav from "./MainNav";
import { useAuth } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
const SignUp = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [errors, setErrors] = useState({});
  const [usersRegistrationDetails, setUsersRegistrationDetails] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    facebookLink: "",
    phone: "",
    about: "",
    bank: {
      bankName: "",
      branchName: "",
      accountHolderName: "",
      accountNumber: "",
    },
    task: [],
  });
  const handleUsersRegistration = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsersRegistrationDetails({
      ...usersRegistrationDetails,
      [name]: value,
    });
  };
  const handleUsersRegistration2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    usersRegistrationDetails.bank = {
      ...usersRegistrationDetails.bank,
      [name]: value,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!usersRegistrationDetails.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(usersRegistrationDetails.email)) {
      validationErrors.email = "Invalid email";
    }

    if (!usersRegistrationDetails.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (
      usersRegistrationDetails.password.length < 8 ||
      usersRegistrationDetails.password.length > 8
    ) {
      validationErrors.password = "Password must be  8 charecters";
    }
    if (!usersRegistrationDetails.name.trim()) {
      validationErrors.name = "Name is required ";
    }

    if (!usersRegistrationDetails.userName.trim()) {
      validationErrors.userName = "userName is required ";
    } else if (
      usersRegistrationDetails.userName.length > 8 ||
      usersRegistrationDetails.userName.length < 8
    ) {
      validationErrors.userName = "User-name must be 8 charecters";
    }

    if (!usersRegistrationDetails.phone.trim()) {
      validationErrors.phone = "Phone is required";
    } else if (
      usersRegistrationDetails.phone.length < 11 ||
      usersRegistrationDetails.phone.length > 11
    ) {
      validationErrors.phone = "Phone must be 11 Charecters";
    }
    if (!usersRegistrationDetails.facebookLink.trim()) {
      validationErrors.facebookLink = "FacebookLink is required";
    }
    if (!usersRegistrationDetails.about.trim()) {
      validationErrors.about = "About is required";
    } else if (usersRegistrationDetails.about.length > 600) {
      validationErrors.about = "About must be in 600 Charecters";
    }
    if (!usersRegistrationDetails.bank.bankName.trim()) {
      validationErrors.bankName = "Bank name is required";
    }
    if (!usersRegistrationDetails.bank.branchName.trim()) {
      validationErrors.branchName = "Branch name is required";
    }
    if (!usersRegistrationDetails.bank.accountHolderName.trim()) {
      validationErrors.accountHolderName = "Account HolderName  is required";
    }
    if (!usersRegistrationDetails.bank.accountNumber.trim()) {
      validationErrors.accountNumber = "Account Number  is required";
    }

    setErrors(validationErrors);
    try {
      if (Object.keys(validationErrors).length === 0) {
        const { email, password, name, userName, facebookLink, phone, about } =
          usersRegistrationDetails;
        const { branchName, accountNumber, accountHolderName, bankName } =
          usersRegistrationDetails.bank;
        startLoading();
        const res = await fetch(
          "https://data-orchard-server.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              name,
              userName,
              facebookLink,
              phone,
              about,
              bank: { branchName, accountNumber, accountHolderName, bankName },
            }),
          }
        );

        const data = await res.json();
        const userEmail = await data.email;
        if (userEmail) {
          setIsAuthenticated(true);
          navigate(`/upload/profileImage/${userEmail}`);
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
  return (
    <div>
      <MainNav />
      <section id="register">
        <div
          className="wrapper2"
          style={{
            width: `${window.innerWidth <= 900 ? "800px" : "850px"}`,
            minHeight: "90vh",
            justifyContent: "flex-start",
            padding: "20px",
            flexWrap: "wrap",
          }}
        >
          <div className="form-box register">
            <h2>Registration</h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="between">
                <div className="input-box">
                  <FaEnvelope className="iconn" />
                  <input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    defaultValue={usersRegistrationDetails.email}
                    onChange={handleUsersRegistration}
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
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    defaultValue={usersRegistrationDetails.password}
                    onChange={handleUsersRegistration}
                  />
                  {errors.password && (
                    <span>
                      {errors.password}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="between">
                <div className="input-box">
                  <FaFileSignature className="iconn" />
                  <input
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    defaultValue={usersRegistrationDetails.name}
                    onChange={handleUsersRegistration}
                  />
                  {errors.name && (
                    <span>
                      {errors.name}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-box">
                  <FaUserLarge className="iconn" />
                  <input
                    placeholder="Enter your userName"
                    type="text"
                    name="userName"
                    defaultValue={usersRegistrationDetails.userName}
                    onChange={handleUsersRegistration}
                  />
                  {errors.userName && (
                    <span>
                      {errors.userName}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="userName">User-Name</label>
                </div>
              </div>
              <div className="between">
                <div className="input-box">
                  <FaPhone className="iconn" />
                  <input
                    placeholder="Enter your Phone"
                    type="number"
                    name="phone"
                    defaultValue={usersRegistrationDetails.phone}
                    onChange={handleUsersRegistration}
                  />
                  {errors.phone && (
                    <span>
                      {errors.phone}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="input-box">
                  <FaFacebook className="iconn" />
                  <input
                    placeholder="Enter your facebook"
                    type="text"
                    name="facebookLink"
                    defaultValue={usersRegistrationDetails.facebookLink}
                    onChange={handleUsersRegistration}
                  />
                  {errors.facebookLink && (
                    <span>
                      {errors.facebookLink}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="facebookLink">Facebook Link</label>
                </div>
              </div>

              <div className="input-textArea">
                <label htmlFor="about">About</label>
                <textarea
                  type="text"
                  name="about"
                  style={{ maxWidth: "100%", height: "200px" }}
                  defaultValue={usersRegistrationDetails.about}
                  onChange={handleUsersRegistration}
                />
                {errors.about && (
                  <span>
                    {errors.about}
                    <IoWarning className="warning" />
                  </span>
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{ color: "white", marginLeft: "5px", display: "flex" }}
                >
                  Bank Details:
                </h3>
              </div>
              <div className="between">
                <div className="input-box">
                  <FaVault className="iconn" />
                  <input
                    placeholder="Enter your bankName"
                    type="text"
                    name="bankName"
                    defaultValue={usersRegistrationDetails.bank.bankName}
                    onChange={handleUsersRegistration2}
                  />
                  {errors.bankName && (
                    <span>
                      {errors.bankName}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="bankName">Bank Name</label>
                </div>
                <div className="input-box">
                  <FaCodeBranch className="iconn" />
                  <input
                    placeholder="Enter your branchName"
                    type="text"
                    name="branchName"
                    defaultValue={usersRegistrationDetails.bank.branchName}
                    onChange={handleUsersRegistration2}
                  />
                  {errors.branchName && (
                    <span>
                      {errors.branchName}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="branchName">Branch Name</label>
                </div>
              </div>
              <div className="between">
                <div className="input-box">
                  <FaFileSignature className="iconn" />
                  <input
                    placeholder="Enter your AccountName"
                    type="text"
                    name="accountHolderName"
                    defaultValue={
                      usersRegistrationDetails.bank.accountHolderName
                    }
                    onChange={handleUsersRegistration2}
                  />
                  {errors.accountHolderName && (
                    <span>
                      {errors.accountHolderName}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="accountHolderName">Account Holder Name</label>
                </div>
                <div className="input-box">
                  <FaHashtag className="iconn" />
                  <input
                    placeholder="Enter your accountNumber"
                    type="Number"
                    name="accountNumber"
                    defaultValue={usersRegistrationDetails.bank.accountNumber}
                    onChange={handleUsersRegistration2}
                  />
                  {errors.accountHolderName && (
                    <span>
                      {errors.accountHolderName}
                      <IoWarning className="warning" />
                    </span>
                  )}
                  <label htmlFor="accountNumber">Account Number</label>
                </div>
              </div>

              <button type="submit" className="btn">
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?
                  <Link to="/" className="login-link">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
