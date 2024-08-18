import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaVault } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import NavBar from "./NavBar";
const UpdateUser = () => {
  const [errors, setErrors] = useState({});
  const { userName } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
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
    setUsersRegistrationDetails({
      ...usersRegistrationDetails,
      bank: {
        ...usersRegistrationDetails.bank,
        [name]: value,
      },
    });
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
    if (!usersRegistrationDetails.bank.accountNumber) {
      validationErrors.accountNumber = "Account Number  is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, password, name, facebookLink, phone, cv, about } =
        usersRegistrationDetails;
      const { branchName, accountNumber, accountHolderName, bankName } =
        usersRegistrationDetails.bank;
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/update/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
            facebookLink,
            phone,
            about,
            bank: { branchName, accountNumber, accountHolderName, bankName },
          }),
        }
      );

      const data = await res.json();

      if (data.email) {
        navigate(`/users/${data.userName}`);
      } else {
        window.alert("Something went wrong");
      }
    }
  };

  const getUser = async () => {
    const res = await fetch(
      `https://data-orchard-server.onrender.com/users/update/${userName}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (data.email) {
      setUser(data);
      setUsersRegistrationDetails(data);
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section id="register">
      <NavBar userName={userName} />
      <div
        className="wrapper2"
        style={{
          width: `${window.innerWidth <= 900 ? "800px" : "850px"}`,
          minHeight: "90vh",
          justifyContent: "flex-start",
          padding: "20px",
          flexWrap: "wrap",
          marginTop: "-5px",
        }}
      >
        <div className="back">
          <span
            onClick={() => {
              navigate(`/users/${userName}`);
            }}
          >
            <FaArrowLeftLong />
            Go Back
          </span>
        </div>
        <div className="form-box register" style={{ marginTop: "-30px" }}>
          <h2>Update Form</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                gap: "20px",
                width: "100%",
              }}
            >
              <div className="input-box">
                <FaEnvelope className="iconn" />
                <input
                  type="email"
                  name="email"
                  value={usersRegistrationDetails.email}
                  onChange={handleUsersRegistration}
                  required={true}
                  disabled={true}
                  style={{ textDecoration: "line-through" }}
                />

                {/* <label htmlFor="email">Email</label> */}
              </div>
              <div className="input-box">
                <FaLock className="iconn" />
                <input
                  type="password"
                  name="password"
                  value={usersRegistrationDetails.password}
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
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div className="input-box">
                <FaFileSignature className="iconn" />
                <input
                  type="text"
                  name="name"
                  value={usersRegistrationDetails.name}
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
                  type="text"
                  name="userName"
                  value={usersRegistrationDetails.userName}
                  onChange={handleUsersRegistration}
                  required={true}
                  disabled={true}
                  style={{ textDecoration: "line-through" }}
                />
                {/* <label htmlFor="userName">User-Name</label> */}
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div className="input-box">
                <FaPhone className="iconn" />

                <input
                  type="number"
                  name="phone"
                  value={usersRegistrationDetails.phone}
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
                  type="text"
                  name="facebookLink"
                  value={usersRegistrationDetails.facebookLink}
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
                value={usersRegistrationDetails.about}
                onChange={handleUsersRegistration}
              />
              {errors.about && (
                <span>
                  {errors.about}
                  <IoWarning className="warning" />
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <h3 style={{ color: "white", marginLeft: "5px" }}>
                Bank Details:
              </h3>
            </div>
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div className="input-box">
                <FaVault className="iconn" />
                <input
                  type="text"
                  name="bankName"
                  value={usersRegistrationDetails.bank.bankName}
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
                  type="text"
                  name="branchName"
                  value={usersRegistrationDetails.bank.branchName}
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
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div className="input-box">
                <FaFileSignature className="iconn" />
                <input
                  type="text"
                  name="accountHolderName"
                  value={usersRegistrationDetails.bank.accountHolderName}
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
                  type="number"
                  name="accountNumber"
                  value={usersRegistrationDetails.bank.accountNumber}
                  onChange={handleUsersRegistration2}
                />
                {errors.accountNumber && (
                  <span>
                    {errors.accountNumber}
                    <IoWarning className="warning" />
                  </span>
                )}
                <label htmlFor="accountNumber">Account Number</label>
              </div>
            </div>

            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
