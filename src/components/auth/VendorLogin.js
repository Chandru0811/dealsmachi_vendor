import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import ApprovePopup from "./ApprovePopup";
import api from "../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import headerlogo from "../../assets/header-logo.webp";

function VendorLogin({ handleVendorLogin, handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);
        const response = await api.post(`login`, values);
        if (response.status === 200) {
          toast.success(response.data.message);

          sessionStorage.setItem("token", response.data.data.token);
          sessionStorage.setItem("name", response.data.data.userDetails.name);
          sessionStorage.setItem("id", response.data.data.userDetails.id);
          sessionStorage.setItem("email", response.data.data.userDetails.email);
          sessionStorage.setItem("role", response.data.data.userDetails.role);
          sessionStorage.setItem("active", "0");
          sessionStorage.setItem(
            "shop_id",
            response.data.data.userDetails.shop_id
          );

          if (response.data.data.userDetails.role === "1") {
            handleLogin(values);
          } else if (response.data.data.userDetails.role === "2") {
            if (response.data.data.userDetails.shop_id === null) {
              navigate(`/wellcomepage/${response.data.data.userDetails.id}`);
            } else {
              navigate("/");
              handleVendorLogin(values);
            }
          } else {
            toast(
              "Oops! You don't have access to this page, but feel free to check out our amazing website! 😊",
              {
                icon: "😊",
              }
            );
            setTimeout(() => {
              window.location.href = "https://ecsaio.com";
            }, 5000);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          if (errorMessage) {
            toast(errorMessage, {
              icon: <FiAlertTriangle className="text-warning" />,
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
      <div className=" d-flex  justify-content-center align-items-center mt-5">
        <div
          className="card shadow-lg p-3 mb-5 mt-0 rounded"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div className="d-flex justify-content-around ">
            <h3
              className={`cursor-pointer py-2`}
              style={{
                borderBottom: "2px solid #ff0060",
                paddingBottom: "5px",
                width: "100%",
                textAlign: "center",
                color: "#ff0060",
              }}
            >
              Login
            </h3>
          </div>
          <Form onSubmit={formik.handleSubmit}>
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

            <div className="d-flex justify-content-between align-items-center py-2">
              <Form.Label>Password</Form.Label>
              <Link
                to="/forgot"
                className="ml-auto"
                style={{
                  fontSize: "0.9em",
                  textDecoration: "none",
                  color: "#ff0060",
                }}
              >
                Forgot Password?
              </Link>
            </div>
            <Form.Group controlId="formPassword" className="mb-3">
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...formik.getFieldProps("password")}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.values.password && (
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {formik.touched.password && formik.errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </div>
            </Form.Group>

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
              Login
            </Button>

            <div className="text-center mt-4">
              <p className="mb-3">or</p>
              <Link to="/register">
                <Button
                  variant="light"
                  className="border shadow-none"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  Register as a Vendor
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default VendorLogin;
