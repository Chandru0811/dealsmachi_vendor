import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Success from "../../../../assets/Success2.png";



const Form3 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators, handleVendorLogin }, ref) => {
    // const navigate = useNavigate();
    const formik = useFormik({
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        handleVendorLogin();
        handleNext();
      },
    });

    useImperativeHandle(ref, () => ({
      form3: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="row  mt-5">
          <div className="col-md-12 col-12 d-flex flex-column align-items-center justify-content-center">
            <img
              className="img-fluid"
              src={Success}
              alt="Success"
              width={220}
            />
            <h2 className="py-5">Your Store is Ready !</h2>
            <Link to={"/vendorlogin"} className=" mt-4">
              <button
                className="btn"
                style={{ backgroundColor: "#ef4444", color: "white" }}
                onClick={handleVendorLogin}
              >
                Go to your store Dashboard!
              </button>


            </Link>
            <Link
              to={"/"}
              className="pt-5"
              style={{ textDecoration: "underline" , color:"#ef4444"}}
            >
              <p>Return to the Marketplace</p>
            </Link>
          </div>
        </div>
      </form>
    );
  }
);

export default Form3;
