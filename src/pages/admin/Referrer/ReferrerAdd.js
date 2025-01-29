import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function CategoriesAdd() {
  const validationSchema = Yup.object({
    referrer_id: Yup.string().required("*Select a referrer id"),
    referrer_name: Yup.string().required("*Referrer name is required"),
    vendor_name: Yup.string().required("*Select a vendor name"),
    amount: Yup.string().required("*Amount is required"),
    date: Yup.string().required("*Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      referrer_id: "",
      referrer_name: "",
      vendor_name: "",
      amount: "",
      date: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">Add Referrer</h1>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/referrer">
                    <button type="button" className="btn btn-light btn-sm">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 my-2">
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Referrer ID<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.referrer_id && formik.errors.referrer_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("referrer_id")}
                >
                  <option></option>
                  <option value="1">Suriya</option>
                  <option value="2">Chandru</option>
                  <option value="3">Saravanan</option>
                </select>
                {formik.touched.referrer_id && formik.errors.referrer_id && (
                  <div className="invalid-feedback">
                    {formik.errors.referrer_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Referrer Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.referrer_name && formik.errors.referrer_name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("referrer_name")}
                />
                {formik.touched.referrer_name &&
                  formik.errors.referrer_name && (
                    <div className="invalid-feedback">
                      {formik.errors.referrer_name}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Vendor Name<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.vendor_name && formik.errors.vendor_name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("vendor_name")}
                >
                  <option></option>
                  <option value="1">Leela</option>
                  <option value="2">Poongodi</option>
                  <option value="3">Gayathri</option>
                </select>
                {formik.touched.vendor_name && formik.errors.vendor_name && (
                  <div className="invalid-feedback">
                    {formik.errors.vendor_name}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Date<span className="text-danger">*</span>
                </label>
                <input
                  type="month"
                  className={`form-control ${
                    formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className={`form-control ${
                    formik.touched.amount && formik.errors.amount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("amount")}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="invalid-feedback">{formik.errors.amount}</div>
                )}
              </div>
            </div>
          </div>
          <div className="hstack p-2">
            <button type="submit" className="btn btn-sm btn-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesAdd;
