/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import headerlogo from "../../../../assets/header-logo.webp";

function Register({ handleVendorLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowCPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    type: Yup.array()
      .of(Yup.string().oneOf(["vendor", "referrer"], "Invalid selection"))
      .min(1, "At least one type must be selected"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      referral_code: "",
      type: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const typeString =
        values.type.includes("vendor") && values.type.includes("referrer")
          ? "referrer-vendor"
          : values.type.join("");
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.cpassword,
        referral_code: values.referral_code,
        role: "2",
        type: typeString,
      };
      // console.log(payload);
      try {
        setLoadIndicator(true);
        const response = await api.post(`register`, payload);
        if (response.status === 200) {
          const responseData = response.data.data;
          console.log("object", responseData);
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("type", typeString);
          localStorage.setItem("name", response.data.data.userDetails.name);
          localStorage.setItem("id", response.data.data.userDetails.id);
          localStorage.setItem("email", response.data.data.userDetails.email);
          localStorage.setItem("role", response.data.data.userDetails.role);
          localStorage.setItem(
            "referrer_code",
            response.data.data.referrer_code
          );
          localStorage.setItem(
            "referral_code",
            response.data.data.userDetails.referral_code
          );
          localStorage.setItem("active", "0");
          if (typeString !== "referrer") {
            navigate(
              `/wellcomepage/${response.data.data.userDetails.id}?name=${response.data.data.userDetails.name}&email=${response.data.data.userDetails.email}`
            );
          } else {
            handleVendorLogin();
            navigate("/referrer_dashboard");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 422) {
          console.log("Full error response:", error.response);

          const errors = error.response.data.error;

          if (errors) {
            Object.keys(errors).map((key) => {
              errors[key].map((errorMsg) => {
                toast(errorMsg, {
                  icon: <FiAlertTriangle className="text-warning" />,
                });
              });
            });
          }
        } else {
          console.error("API Error", error);
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleconfirmPasswordVisibility = () => {
    setShowCPassword(!showcPassword);
  };

  const handleCheckboxChange = (value) => {
    formik.setFieldValue(
      "type",
      formik.values.type.includes(value)
        ? formik.values.type.filter((item) => item !== value) // Remove if already selected
        : [...formik.values.type, value] // Add if not selected
    );
  };

  return (
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
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div
          className="card shadow-lg p-3 my-5 rounded"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div>
            <Link to="/">
              <button className="btn btn-link text-start shadow-none h-0">
                <IoMdArrowBack style={{ color: "#ff0060" }} />
              </button>
            </Link>
            <div>
              <h3
                className={`pb-5`}
                style={{
                  borderBottom: "2px solid #ff0060",
                  width: "100%",
                  textAlign: "center",
                  color: "#ff0060",
                }}
              >
                Register
              </h3>
            </div>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="name" className="mb-3 pt-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3 pt-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div
                className={`input-group mb-3`}
                style={{ outline: "none", boxShadow: "none" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback" typeof="in">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Confirm Password</label>
              <div
                className={`input-group mb-3`}
                style={{ outline: "none", boxShadow: "none" }}
              >
                <input
                  type={showcPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${
                    formik.touched.cpassword && formik.errors.cpassword
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="cpassword"
                  {...formik.getFieldProps("cpassword")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={toggleconfirmPasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.cpassword && formik.errors.cpassword && (
                  <div className="invalid-feedback">
                    {formik.errors.cpassword}
                  </div>
                )}
              </div>
            </div>
            <Form.Group controlId="referral_code" className="mb-3 pt-4">
              <Form.Label>Referral Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Referral Code"
                {...formik.getFieldProps("referral_code")}
                isInvalid={
                  formik.touched.referral_code && formik.errors.referral_code
                }
              />
              {formik.touched.referral_code && formik.errors.referral_code ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.referral_code}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Vendor"
                className="me-3"
                checked={formik.values.type.includes("vendor")}
                onChange={() => handleCheckboxChange("vendor")}
              />
              <Form.Check
                type="checkbox"
                label="Referrer"
                checked={formik.values.type.includes("referrer")}
                onChange={() => handleCheckboxChange("referrer")}
              />
            </div>

            <Button
              type="submit"
              className="w-100 mt-4 common-button"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
