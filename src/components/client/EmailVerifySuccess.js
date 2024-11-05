import React from "react";
import Logo from "../../assets/header-logo.webp";
import Success from "../../assets/Success1.png";
import { Link } from "react-router-dom";

function EmailVerifySuccess() {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-80"
      style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}
    >
      <img src={Logo} alt="Logo" className="img-fluid" />
      <div
        className="card shadow-lg p-3 mb-5 mt-5 rounded"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={Success} alt="Success" className="img-fluid" width={250} />
          <h3 className="text-center">
            Your email has been successfully verified!
          </h3>
          <p className="text-center my-3">
            We're grateful to welcome you as a Dealslah vendor.
          </p>
          <p className="text-center">
            Start your journey with us and explore new sales opportunities.
          </p>
          <Link to="/">
            <button className="my-4 common-button py-2 px-5 rounded">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifySuccess;
