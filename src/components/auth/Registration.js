import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Header_logo.png";

function Registration({ handleLogin, handleVendorLogin }) {
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
      className="container-fluid d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow-lg py-3 mb-5 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="d-flex flex-column justify-content-around align-items-center">
          {/* Image Section */}
          <img
            src={Logo} // Replace with your image URL
            alt="centered-img"
            className="mb-3 p-3"
            // style={{ width: "150px", height: "150px" }} // Adjust size as needed
          />

          {/* Buttons Section */}
          <div className="d-flex justify-content-between w-100 px-2">
            <Link to="/login">
              <button
                className="btn common-button"
                onClick={() => handleRoleSelect("admin")}
              >
                Admin
              </button>
            </Link>
            <Link to="/login">
              <button
                className="btn btn-white"
                style={{ color: "#9c54ff", border: "1px solid #9c54ff" }}
                onClick={() => handleRoleSelect("vendor")}
              >
                Vendor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
