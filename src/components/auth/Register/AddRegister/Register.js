import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Register() {
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
    // role: Yup.string().required("Please select a role"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      //   role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.cpassword,
      };
      try {
        setLoadIndicator(true);
        const response = await api.post(`register`, payload);
        if (response.status === 200) {
          //   const { id } = response.data.data;
          //   console.log("object",id)
          toast.success(response.data.message);

          navigate(`/`);
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

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-3 my-5 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Link to="/">
          <button className="btn btn-link text-start shadow-none h-0">
            <IoMdArrowBack style={{ color: "#ef4444" }} />
          </button>
        </Link>
        <div className="d-flex justify-content-around ">
          <h3
            className={`py-2`}
            style={{
              borderBottom: "2px solid #ef4444",
              paddingBottom: "5px",
              width: "100%",
              textAlign: "center",
              color: "#ef4444",
            }}
          >
            Register
          </h3>
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

          {/* <div className="d-flex justify-content-between align-items-center py-2">
            <Form.Label>Password</Form.Label>
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
                    right: "40px",
                    top: "45%",
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
          <div className="d-flex justify-content-between align-items-center py-2">
            <Form.Label>Confirm Password</Form.Label>
          </div>
          <Form.Group controlId="confirmpassword" className="mb-3">
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showcPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                {...formik.getFieldProps("cpassword")}
                isInvalid={formik.touched.cpassword && formik.errors.cpassword}
              />
              {formik.values.cpassword && (
                <span
                  onClick={toggleconfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "45%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showcPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.cpassword}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Form.Group> */}

          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <div className={`input-group mb-3`} style={{outline: "none", boxShadow: "none" }}>
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
                <div className="invalid-feedback" typeof="in">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Confirm Password</label>
            <div className={`input-group mb-3`} style={{outline: "none", boxShadow: "none" }}>
              <input
                type={showPassword ? "text" : "password"}
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
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", borderRadius: "3px" }}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
              {formik.touched.cpassword && formik.errors.cpassword && (
                <div className="invalid-feedback">{formik.errors.cpassword}</div>
              )}
            </div>
          </div>


          {/* <Form.Group controlId="role" className="mb-3 ">
            <div className=" d-flex justify-content-around">
              <Form.Check
                type="radio"
                label="I am a vendor"
                name="role"
                value="vendor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.role && formik.errors.role}
                checked={formik.values.role === "vendor"}
              />
              <Form.Check
                type="radio"
                label="I am a customer"
                name="role"
                value="customer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.role && formik.errors.role}
                checked={formik.values.role === "customer"}
              />
            </div>
            {formik.touched.role && formik.errors.role ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {formik.errors.role}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group> */}

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
  );
}

export default Register;
