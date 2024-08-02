import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserDesc from "./UserDesc";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import NavBar from "./NavBar";
import { LoadingContext } from "./LoadingContext";
const User = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [user, setUser] = useState({});
  const [bankDetails, setBankDetails] = useState({});
  const navigate = useNavigate();
  const { userName } = useParams();
  const getData = async () => {
    try {
      startLoading();
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/${userName}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.userName) {
        setUser(data);
        setBankDetails(data.bank);
      } else {
        window.alert("Something Wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      id="userID"
      style={{
        width: "100%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "40px",
      }}
    >
      <NavBar userName={userName} />
      <div
        className="wrapper2 "
        style={{
          width: `${window.innerWidth <= 900 ? "800px" : "850px"}`,
          minHeight: "90vh",
          justifyContent: "flex-start",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="user-content ">
          <h1>Welcome, {user.name} </h1>
          <div className="user-details">
            <div className="userTop">
              <div className="userImage">
                <img
                  src={`https://data-orchard-server.onrender.com/${user.profileImage}`}
                  alt="profileImage"
                />
              </div>
              <button
                className="taskBtn"
                onClick={() => {
                  navigate(`/users/task/${userName}`);
                }}
              >
                Go To Task
                <FaArrowUpRightFromSquare />
              </button>
            </div>
            <div className="user-desc">
              <UserDesc left="Name :" right={user.name} />
              <UserDesc left="User-Name :" right={user.userName} />
              <UserDesc left="Email :" right={user.email} />
              <UserDesc left="Phone :" right={`+880 ${user.phone}`} />
              <div>
                <span className="desc-left">Facebook :</span>
                <span className="desc-right">
                  <a style={{ color: "white" }} href={user.facebookLink}>
                    {user.facebookLink}
                  </a>
                </span>
              </div>
              <div>
                <span className="desc-left">About : </span>
                <span className="desc-right">
                  <p>{user.about}</p>{" "}
                </span>
              </div>
              <div className="bank">
                <h3>Bank Details :</h3>
                <UserDesc left="Bank Name :" right={bankDetails.bankName} />
                <UserDesc left="Branch Name :" right={bankDetails.branchName} />
                <UserDesc
                  left="Account Holder Name :"
                  right={bankDetails.accountHolderName}
                />
                <UserDesc
                  left="Account Number :"
                  right={bankDetails.accountNumber}
                />
              </div>
            </div>
          </div>
          <div className="nid">
            <div className="bank">
              <h3>NID Details :</h3>
            </div>
            <div className="nid-image">
              <img
                src={`https://data-orchard-server.onrender.com/${user.frontVoterId}`}
                alt="frontVoterId"
              />
              <img
                src={`https://data-orchard-server.onrender.com/${user.backVoterId}`}
                alt="backVoterId"
              />
            </div>
          </div>
          <div className="update">
            <button
              className=" btn"
              onClick={() => {
                navigate(`/users/update/${user.userName}`);
              }}
            >
              Edit Profile Details
            </button>
            <button
              className=" btn"
              onClick={() => {
                navigate(`/upload/profileImage/${user.email}`);
              }}
            >
              Edit Profile Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
