import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/URL";
import headerlogo from "../../assets/header-logo.webp";

const ForgotPage = () => {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post("forgot-password", values);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/forgotsuccess");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.error;
          toast.error(errors.email);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <section>
      <div
        className="container-fluid m-0 vh-100"
        style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}
      >
        <div
          className="d-flex justify-content-center align-items-center m-0 pt-5"
          style={{ backgroundColor: "rgb(242, 242, 242)" }}
        >
          <img src={headerlogo} className="img-fluid" alt="img" />
        </div>
        <div className=" d-flex  justify-content-center align-items-center mt-3">
          <div className="row mt-5">
            <div
              className="card shadow-lg p-3 mb-5 rounded"
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <h3
                className="cursor-pointer py-2 mb-3"
                style={{
                  borderBottom: "2px solid #ff0060",
                  paddingBottom: "5px",
                  width: "100%",
                  textAlign: "center",
                  color: "#ff0060",
                }}
              >
                Forgot Password
              </h3>
              <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "0.9rem" }}
              >
                Enter the email address or mobile phone number associated with
                your account.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-4 mt-2">
                  <label className="form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control rounded-0 ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : formik.touched.email && !formik.errors.email
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                {/* <Link to="/"> */}
                <button
                  type="submit"
                  className="btn btn-primary common-button btn-block mt-3 rounded-0 w-100"
                  style={{ backgroundColor: "#ff0060", borderColor: "#ff0060" }}
                  disabled={loadIndicator}
                >
                  {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  RESET PASSWORD
                </button>
                {/* </Link> */}
              </form>

              <div className="text-center mt-3 mb-4">
                <Link to="/">
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Go Back to &nbsp;
                    <span style={{ color: "#ff0060" }}>Login</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPage;
