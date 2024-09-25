import React from "react";
import NotFoundImg from "../../assets/NotFound.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <img src={NotFoundImg} alt="NotFoundImg" className="img-fluid" />
        <h5 className="py-2">OOPS! PAGE NOT FOUND</h5>
        <Link to='/'>
          <button className="btn btn-sm common-button mb-4">BACK TO HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;