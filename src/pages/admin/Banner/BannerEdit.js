import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function BannerEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("*Title is required"),
    order: Yup.string().required("*Select an Order"),
    image: Yup.string().required("*Image is required"),
    description: Yup.string().required("*Description is required"),
    link: Yup.string().required("*Link is required"),
    link_label: Yup.string().required("*Link Label is required"),
    bg_color: Yup.string().required("*Color is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "Laptop",
      order: "3",
      image: "",
      description: "Combines style and performance for everyday computing.",
      link: "https://ecsaio.com/",
      link_label: "https://ecsaio.com/",
      bg_color: "#000000",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Edit Banner</h1>
              <Link to="/banner">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh" }}
        >
          <div className="row mt-3">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.title && formik.errors.title
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif, .svg"
                className={`form-control ${formik.touched.image && formik.errors.image
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("image")}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Link<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.link && formik.errors.link ? "is-invalid" : ""
                  }`}
                {...formik.getFieldProps("link")}
              />
              {formik.touched.link && formik.errors.link && (
                <div className="invalid-feedback">{formik.errors.link}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Link Label<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.link_label && formik.errors.link_label
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("link_label")}
              />
              {formik.touched.link_label && formik.errors.link_label && (
                <div className="invalid-feedback">
                  {formik.errors.link_label}
                </div>
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {formik.touched.order && formik.errors.order && (
                <div className="invalid-feedback">{formik.errors.order}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3 bannerAdd">
              <label className="form-label">Color Code</label><span className="text-danger">*</span>
              <div className="input-group mb-3">
                <div className="input-group-text inputGroup">
                  <input
                    type="color"
                    {...formik.getFieldProps("bg_color")}
                    className="form-control form-control circle"
                  />
                </div>
                <input
                  type="text"
                  className={`form-control ${formik.touched.bg_color && formik.errors.bg_color
                    ? "is-invalid"
                    : ""
                    }`}
                  value={formik.values.bg_color}
                  placeholder=""
                />
              </div>
              {formik.errors.bg_color ? (
                <div className="error text-danger ">
                  <small>{formik.errors.bg_color}</small>
                </div>
              ) : null}
            </div>
            <div className="col-md-12 col-12 mb-3">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                rows={5}
                className={`form-control ${formik.touched.description && formik.errors.description
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hstack gap-2 justify-content-end p-2">

          <button type="submit" className="btn btn-sm btn-button">
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default BannerEdit;