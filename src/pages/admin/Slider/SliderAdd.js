import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function SliderAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    order: Yup.string().required("*Select an Order"),
    image: Yup.mixed().required("*Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      order: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Data:", values);

      const formData = new FormData();
      formData.append("order", values.order);
      formData.append("image", values.image);

      setLoadIndicator(true);

      try {
        const response = await api.post(`admin/slider`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response", response);

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/slider");
          resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.data.error;
            if (errors) {
              Object.keys(errors).forEach((key) => {
                errors[key].forEach((errorMsg) => {
                  toast(errorMsg, {
                    icon: <FiAlertTriangle className="text-warning" />,
                  });
                });
              });
            }
          } else {
            toast.error(
              error.response.data.message || "An unexpected error occurred."
            );
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

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Add Slider</h1>
              <Link to="/slider">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "60vh" }}
        >
          <div className="row mt-3">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
                className={`form-control ${formik.touched.image && formik.errors.image
                    ? "is-invalid"
                    : ""
                  }`}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("image", file);
                }}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Order<span className="text-danger">*</span>
              </label>
              <select
                aria-label="Default select example"
                className={`form-select ${formik.touched.order && formik.errors.order
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("order")}
              >
                <option value="">Select an order</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              {formik.touched.order && formik.errors.order && (
                <div className="invalid-feedback">{formik.errors.order}</div>
              )}
            </div>
          </div>
        </div>
        <div className="hstack gap-2 justify-content-end p-2">
          <button type="submit" className="btn btn-sm btn-button"
            disabled={loadIndicator}>
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default SliderAdd;
