import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth2 } from "./AuthContext2";
import { LoadingContext } from "./LoadingContext";

const UsersReport = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { setIsAuthenticated2 } = useAuth2();
  const [usersReport, setUsersReport] = useState(null);
  const [usersReport2, setUsersReport2] = useState(null);
  const [userRecordName, setUserRecordName] = useState(null);
  const [userRecordDate, setUserRecordDate] = useState(null);
  const navigate = useNavigate();

  const getUsersReport = async () => {
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/get-dataorchard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data) {
        setUsersReport(data);
        setUsersReport2(data);
      } else {
        console.log("something Wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  // Function to get unique usernames
  const getUniqueUsernames = (users) => {
    const usernames = users.map((user) => user.userName);
    return [...new Set(usernames)];
  };
  const handleUserRecord = async (e) => {
    const desiredUserName = e.target.value;
    setUserRecordName(desiredUserName);
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/desired-userName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            desiredUserName,
          }),
        }
      );
      const data = await res.json();
      if (data) {
        setUsersReport(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  const handleUserRecordDate = (e) => {
    setUserRecordDate(e.target.value);
  };
  const handleUserRecordFinal = async (e) => {
    e.preventDefault();

    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/desired-user-record",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userRecordName,
            userRecordDate,
          }),
        }
      );
      const data = await res.json();
      if (data) {
        setUsersReport(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    getUsersReport();
  }, []);

  return (
    <section
      id="usersReport"
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
      <div className="navAdmin">
        <nav className="mainNav">
          <img src="/dataOrchard.png" alt="dataOrchard.png" />
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
        <h1 style={{ textAlign: "center" }}>User's Report</h1>
        <div className="search-filter">
          {usersReport ? (
            <form onSubmit={handleUserRecordFinal}>
              <select name="userRecordName" id="" onChange={handleUserRecord}>
                <option value="Select a user">Select a user</option>
                {getUniqueUsernames(usersReport2).map((userName, index) => (
                  <option key={index} value={userName}>
                    {userName}
                  </option>
                ))}
              </select>
              <input type="date" onChange={handleUserRecordDate} />
              <button type="submit">Search</button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className="usersReport-content">
          {usersReport ? (
            <h4 style={{ marginBottom: "20px" }}>
              Total submitted data : {usersReport.length}
            </h4>
          ) : (
            ""
          )}
          {usersReport ? (
            <table border={1} cellSpacing={0} style={{ width: "100%" }}>
              <tbody>
                {usersReport.map((sUser, index) => {
                  const { recordId, userName, date, time } = sUser;
                  return (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{recordId}</td>
                      <td>{userName}</td>
                      <td>{time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default UsersReport;
