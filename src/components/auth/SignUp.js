import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("SignUp Values:", values);
    },
  });

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            {...formik.getFieldProps("name")}
            isInvalid={formik.touched.name && formik.errors.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            {formik.values.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
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

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...formik.getFieldProps("confirmPassword")}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            {formik.values.confirmPassword && (
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Form.Group>

        <Form.Group controlId="formAgreeToTerms" className="my-1">
          <Form.Check
            type="checkbox"
            label={
              <>
                Are you agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Terms of Condition
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Privacy Policy
                </a>
              </>
            }
            {...formik.getFieldProps("agreeToTerms")}
            isInvalid={
              formik.touched.agreeToTerms && formik.errors.agreeToTerms
            }
            onChange={(e) => {
              formik.setFieldValue("agreeToTerms", e.target.checked);
              console.log(e.target.checked);
            }}
          />
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.agreeToTerms}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>

        <Button type="submit" className="w-100 mt-4 common-button">
          SIGN UP
        </Button>

        <div className="text-center mt-4">
          <p className="mb-3">or</p>

          <Button
            variant="light"
            className="w-100 border shadow-none"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "15px",
              }}
            >
              <FcGoogle />
            </div>
            Sign In with Google
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
