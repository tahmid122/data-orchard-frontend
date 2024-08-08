import React, { useContext, useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowsUpDown } from "react-icons/fa6";
import UserDesc from "./UserDesc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth2 } from "./AuthContext2";
import { LoadingContext } from "./LoadingContext";
const Admin = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { setIsAuthenticated2 } = useAuth2();
  const navigate = useNavigate();
  // const [isDisabled, setIsDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [isTrue, setIsTrue] = useState(true);
  const [matchIndex, setmatchIndex] = useState(null);
  const [paidAmount, setpaidAmount] = useState(0);
  const getData = async () => {
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        setUsers(data);
      } else {
        console.log("something Wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  // Function to calculate the total completed tasks
  const calculateTotalCompletedTasks = () => {
    return users.reduce((total, user) => {
      const userTotal = user.task.reduce(
        (taskTotal, task) => taskTotal + task.completedTask,
        0
      );
      return total + userTotal;
    }, 0);
  };
  const totalCompletedTasks = calculateTotalCompletedTasks();

  const handleReset = async () => {
    await handleSaveLog();
    await Promise.all(
      users.map((user) => handlePendingAmount(user.userName, user))
    );
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/resetAll",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: [],
          }),
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
      getData();
    }
  };

  const handleSaveLog = async () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let monthName = `${month[d.getMonth()]}, ${d.getFullYear()}`;

    users.map(async (user, index) => {
      const totalTask = user.task.reduce(
        (acc, single) => acc + single.completedTask,
        0
      );
      try {
        startLoading();
        const res = await fetch(
          "https://data-orchard-server.onrender.com/admin/working-history",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: monthName,
              name: user.name,
              completedTask: totalTask,
              totalAmount: totalTask * 5,
            }),
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    });
    window.alert("Successfully Saved. Press OK to reset");
    // setIsDisabled(true);
  };
  const deleteUser = async (userName) => {
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/admin",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
          }),
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
    getData();
  };

  const handlePaidAmount = async (userName, user) => {
    if (paidAmount >= 0) {
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/paidamount/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pending: 0,
            nextTime: false,
            fullPay: true,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        getData();
      }
    }
  };
  const handlePendingAmount = async (userName, user) => {
    try {
      startLoading();
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/pendingamount/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pending: user.salary,
            salary: 0,
            nextTime: true,
            fullPay: false,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        getData();
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
    <section
      id="admin"
      style={{
        padding: "0 20px",
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
        <div className="admin-content">
          <nav>
            <ul>
              <li>
                <Link
                  to={"/admin/working-history"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    color: "white",
                  }}
                >
                  Work History <FaArrowTrendUp style={{ fontSize: "18px" }} />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="admin-container">
            <div className="summary">
              <h3>Total users : {users.length}</h3>
              <h2>Total Task : {totalCompletedTasks}</h2>
              <h2>Total Amount : {totalCompletedTasks * 5}</h2>
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                <button className="resetBtn" onClick={handleReset}>
                  Reset All
                </button>
              </div>
            </div>
            <div className="admin-content">
              {users.map((user, index) => {
                const { nextTime, fullPay } = user;
                const taskDetails = user.task;
                const {
                  bankName,
                  branchName,
                  accountHolderName,
                  accountNumber,
                } = user.bank;
                const total = user.task.reduce(
                  (acc, single) => acc + single.completedTask,
                  0
                );
                return (
                  <div className="user-single" key={index}>
                    <div className="per-user">
                      <div
                        className={`per-user-primary ${
                          user.nextTime === true ? "setRed" : ""
                        } ${user.fullPay === true ? "setGreen" : ""}`}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaArrowsUpDown
                            onClick={() => {
                              setmatchIndex(index);
                              matchIndex === index
                                ? setIsTrue(!isTrue)
                                : setIsTrue(false);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        {/* <div className="name">
                        <span>Name: </span> {user.name}
                      </div> */}
                        <div className="userName">
                          <span></span> {user.userName}
                        </div>
                        <div className="totalTask">
                          <span>Task: </span> {total}
                        </div>
                        {/* <div className="totalAmount">
                          <span>Amount: </span> {total * 5}
                        </div> */}
                        <div className="ssalary" title="This month pending">
                          <span>Salary: </span> {user.salary}
                        </div>

                        <div className="paid">
                          <span>Pending: </span>
                          {user ? user.pending : ""}
                        </div>
                        {/* <div className="paid">
                      <span>Total: </span>
                      {user ? user.pending + user.salary : ""}
                    </div> */}
                        {/* <div
                        className="fulldetails"
                        style={{ textAlign: "center" }}
                      ></div> */}
                        <div className="salary">
                          <button
                            onClick={() => {
                              handlePaidAmount(user.userName, user);
                            }}
                          >
                            Paid
                          </button>
                          {/* <button
                        onClick={() => {
                          handlePendingAmount(user.userName, user);
                        }}
                      >
                        Next Time
                      </button> */}
                        </div>
                        <div className="delete-user">
                          <button
                            className="deleteUSer"
                            onClick={() => {
                              deleteUser(user.userName);
                            }}
                          >
                            Delete User
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`full-user-details ${
                        matchIndex === index ? null : "hideFaq"
                      } ${isTrue ? "hideFaq" : null}`}
                    >
                      <div className="work">
                        <table border={1} cellSpacing={0}>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Completed Task</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {taskDetails.map((singleTask, index) => {
                              return (
                                <tr key={index}>
                                  <td>{singleTask.date}</td>
                                  <td>{singleTask.completedTask}</td>
                                  <td>{singleTask.completedTask * 5}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot></tfoot>
                        </table>
                      </div>

                      <div className="personal">
                        <div className="details">
                          <UserDesc left="Name :" right={user.name} />
                          <UserDesc left="User Name :" right={user.userName} />
                          <UserDesc left="Email :" right={user.email} />
                          <UserDesc left="Phone :" right={user.phone} />
                          <div>
                            <span className="desc-left">Facebook :</span>
                            <span className="desc-right">
                              <a
                                style={{ color: "white" }}
                                href={user.facebookLink}
                              >
                                {user.name}'s facebook
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
                            <h3>Bank Details:</h3>
                            <UserDesc left="Bank Name :" right={bankName} />
                            <UserDesc left="Branch Name :" right={branchName} />
                            <UserDesc
                              left="Account Holder Name :"
                              right={accountHolderName}
                            />
                            <UserDesc
                              left="Account Number :"
                              right={accountNumber}
                            />
                          </div>
                        </div>
                        <div className="p-image">
                          <img src={user.profileImage} alt="image" />
                        </div>
                      </div>
                      <div
                        className="nid"
                        style={{
                          marginTop: "0",
                          marginLeft: "30px",
                          marginBottom: "20px",
                        }}
                      >
                        <div className="bank" style={{ marginTop: "0" }}>
                          <h3>NID Details :</h3>
                        </div>
                        <div className="nid-image">
                          <img src={user.frontVoterId} alt="frontVoterId" />
                          <img src={user.backVoterId} alt="backVoterId" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
