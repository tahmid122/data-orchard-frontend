import React, { useContext, useEffect, useState } from "react";
import { useAuth2 } from "./AuthContext2";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "./LoadingContext";
const History = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { setIsAuthenticated2 } = useAuth2();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const getData = async () => {
    try {
      startLoading();
      const res = await fetch(
        "https://data-orchard-server.onrender.com/admin/working-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };
  const groupedData = history.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  useEffect(() => {
    getData();
  }, []);
  return (
    <section id="history">
      <div
        className="history-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="navAdmin">
          <nav className="mainNav">
            <img src="/dataOrchard.png" alt="dataOrchard.png" />
            <ul>
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/admin");
                  }}
                  to={`/admin`}
                >
                  Admin Panel
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
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "20px",
            minHeight: "90vh",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              // width: "100%",
              borderBottom: "4px solid red",
              fontStyle: "italic",
            }}
          >
            Working History
          </h1>
          <div style={{ width: "100%" }}>
            {Object.keys(groupedData).map((date) => (
              <div key={date} style={{ marginTop: "20px" }}>
                <h2>{date}</h2>
                <table cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Completed Tasks</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[date].map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.completedTask}</td>
                        <td>{item.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
