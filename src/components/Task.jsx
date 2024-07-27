import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MdDelete } from "react-icons/md";
import NavBar from "./NavBar";
import { IoWarning } from "react-icons/io5";
import { LoadingContext } from "./LoadingContext";
const Task = () => {
  const today = new Date().toISOString().split("T")[0];
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [errors, setErrors] = useState({});
  const [taskDetails, setTaskDetails] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [user, setUser] = useState(null);
  const [task, setTask] = useState({
    date: "",
    projectName: "",
    completedTask: "",
  });
  const [updateSalary, setUpdateSalary] = useState(false);
  const { userName } = useParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!task.date) {
      validationErrors.date = "Date is required ";
    }
    if (!task.projectName) {
      validationErrors.projectName = "Project name is required ";
    }
    if (!task.completedTask) {
      validationErrors.completedTask = "Completed task is required ";
    }
    setErrors(validationErrors);

    try {
      if (Object.keys(validationErrors).length === 0) {
        const { date, projectName, completedTask } = task;
        startLoading();
        const res = await fetch(
          `https://data-orchard-server.onrender.com/users/task/${userName}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date,
              projectName,
              completedTask,
            }),
          }
        );
        const data = await res.json();

        await getData(); // Wait for the data to be fetched
        setUpdateSalary(true); // Trigger salary update

        setTask({ date: "", projectName: "", completedTask: "" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };

  const getData = async () => {
    try {
      startLoading();
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/task/${userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      setUser(data);
      if (data) {
        const sorting = data.task.sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateB - dateA;
        });
        setTaskDetails(sorting);
        const total = data.task.reduce(
          (acc, single) => acc + parseInt(single.completedTask, 10),
          0
        );
        setTotalTask(total);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };

  const deleteTask = async (id, projectName, date, completedTask) => {
    try {
      startLoading();
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/task/delete/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            projectName,
            date,
            completedTask,
          }),
        }
      );
      const data = await res.json();
      await getData(); // Wait for the data to be fetched
      setUpdateSalary(true); // Trigger salary update
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      stopLoading();
    }
  };

  const handleSalary = async () => {
    try {
      startLoading();
      const res = await fetch(
        `https://data-orchard-server.onrender.com/users/salary/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            salary: totalTask * 5,
          }),
        }
      );
      const data = await res.json();
      if (data) {
        setUser((prevUser) => ({
          ...prevUser,
          salary: data.salary,
        }));
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

  useEffect(() => {
    if (updateSalary) {
      handleSalary();
      setUpdateSalary(false); // Reset the flag
    }
  }, [updateSalary]);

  return (
    <div
      id="task"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <NavBar userName={userName} />
      <div
        className="wrapper2"
        style={{
          width: `${window.innerWidth <= 900 ? "800px" : "850px"}`,
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 className="tdetails">Task Details</h1>
        </div>
        <div className="counting-div">
          <h2>Total Task: {totalTask}</h2>
          <h2>Salary: {user ? user.salary : ""}</h2>
          <h2>Pending: {user ? user.pending + user.salary : ""}</h2>
          {/* <h2>Total Amount: {totalTask * 5}</h2> */}
        </div>
        <div className="task-content">
          <form method="PUT" onSubmit={handleSubmit}>
            <div style={{ width: "100%" }} className="taskBox">
              <input
                type="date"
                name="date"
                placeholder="Enter Date"
                onChange={handleChange}
                value={task.date}
                max={today}
              />
              {errors.date && (
                <span>
                  {errors.date}
                  <IoWarning className="warning" />
                </span>
              )}
            </div>
            <div style={{ width: "100%" }} className="taskBox">
              <select
                name="projectName"
                id="projectName"
                onChange={handleChange}
                value={task.projectName}
              >
                <option value="Select Project">Select Project</option>
                <option value="Data Orchard">Data Orchard</option>
              </select>
              {errors.projectName && (
                <span>
                  {errors.projectName}
                  <IoWarning className="warning" />
                </span>
              )}
            </div>
            <div style={{ width: "100%" }} className="taskBox">
              <input
                type="number"
                name="completedTask"
                placeholder="Enter completedTask"
                onChange={handleChange}
                value={task.completedTask}
              />
              {errors.completedTask && (
                <span>
                  {errors.completedTask}
                  <IoWarning className="warning" />
                </span>
              )}
            </div>

            <button type="submit" className="btn">
              Submit Task
            </button>
          </form>
        </div>
        <div className="task-details">
          <table cellSpacing={0}>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Date</th>
                <th>Project Name</th>
                <th>Completed Task</th>
                <th>Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {taskDetails.map((singleTask, index) => {
                const { id, projectName, date, completedTask } = singleTask;

                return (
                  <tr key={index}>
                    {/* <td style={{ width: "35%" }}>{id}</td> */}
                    <td>{date}</td>
                    <td>{projectName}</td>
                    <td>{completedTask}</td>
                    <td>
                      <MdDelete
                        className="deleteTask"
                        title="Delete this task"
                        onClick={() => {
                          deleteTask(id, projectName, date, completedTask);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
