import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import VendorLogin from "./VendorLogin";
import VendorRegistration from "./VendorRegistration";
import Logo from "../../assets/Header_logo.png";
import { IoMdArrowBack } from "react-icons/io";

function AdminLogin({ handleLogin, handleVendorLogin }) {
  const location = useLocation();
  const initialSignInState = location.state?.showSignUp ? false : true;
  const [isSignIn, setIsSignIn] = useState(initialSignInState);
  const [selectedRole, setSelectedRole] = useState(null); // New state to track selected role

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBackClick = () => {
    setSelectedRole(null);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow-lg py-3 mb-5 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <>
          <Link to="/" style={{ height: "25px" }}>
            <button
              className="btn btn-link text-start shadow-none"
              onClick={handleBackClick}
            >
              <IoMdArrowBack />
            </button>
          </Link>
          <>
            <div className="d-flex justify-content-around">
              <h4
                className={`cursor-pointer py-2 ${
                  isSignIn ? "text-dark" : "text-muted"
                }`}
                style={{
                  borderBottom: isSignIn ? "2px solid #9C54FF" : "none",
                  paddingBottom: "5px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Login
              </h4>
            </div>
            <div className="p-3">
              <SignIn handleLogin={handleLogin} />
            </div>
          </>
        </>
      </div>
    </div>
  );
}

export default AdminLogin;
