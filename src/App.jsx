import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Upload2 from "./components/Upload2";
import User from "./components/User";
import UpdateUser from "./components/UpdateUser";
import Task from "./components/Task";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import History from "./components/History";
import Upload3 from "./components/Upload3";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutes2 from "./components/ProtectedRoutes2";
import { AuthProvider2 } from "./components/AuthContext2";
import ResetPassword from "./components/ResetPassword";
import About from "./components/About";
import Contact from "./components/Contact";
import AdminUpdate from "./components/AdminUpdate";
import ForgetPassword from "./components/ForgetPassword";
import LoadingProvider from "./components/LoadingContext";
import GlobalPreloader from "./components/GlobalPreloader";
import UsersReport from "./components/UsersReport";
function App() {
  return (
    <AuthProvider>
      <AuthProvider2>
        <LoadingProvider>
          {window.innerWidth > 950 ? (
            <BrowserRouter>
              <GlobalPreloader />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login/:userName" />
                <Route path="*" element={<Error />} />
                <Route
                  path="/upload/profileImage/:email"
                  element={
                    <ProtectedRoutes>
                      <Upload />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/upload/frontVoterId/:email"
                  element={
                    <ProtectedRoutes>
                      <Upload2 />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/upload/backVoterId/:email"
                  element={
                    <ProtectedRoutes>
                      <Upload3 />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/users/:userName"
                  element={
                    <ProtectedRoutes>
                      <User />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/users/update/:userName"
                  element={
                    <ProtectedRoutes>
                      <UpdateUser />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/users/task/:userName"
                  element={
                    <ProtectedRoutes>
                      <Task />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoutes2>
                      <Admin />
                    </ProtectedRoutes2>
                  }
                />
                <Route
                  path="usersReport"
                  element={
                    <ProtectedRoutes2>
                      <UsersReport />
                    </ProtectedRoutes2>
                  }
                />
                <Route
                  path="/adminUpdate"
                  element={
                    <ProtectedRoutes2>
                      <AdminUpdate />
                    </ProtectedRoutes2>
                  }
                />
                <Route
                  path="/admin/working-history"
                  element={
                    <ProtectedRoutes2>
                      <History />
                    </ProtectedRoutes2>
                  }
                />
                <Route
                  path="/resetPassword"
                  element={
                    <ProtectedRoutes2>
                      <ResetPassword />
                    </ProtectedRoutes2>
                  }
                />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </BrowserRouter>
          ) : (
            <div className="operate">
              <h3>
                Your device width is too low to operate this website. Please use
                your computer/Laptop
              </h3>
            </div>
          )}
        </LoadingProvider>
      </AuthProvider2>
    </AuthProvider>
  );
}

export default App;
