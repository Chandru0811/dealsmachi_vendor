import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function Location() {
  const id = sessionStorage.getItem("shop_id");
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const validationSchema = Yup.object({
    street: Yup.string().required("Street 1 is required"),
    // street2: Yup.string().required("Street 2 is required"),
    // city: Yup.string().required("City is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
    // state: Yup.string().required("State is required"),
  });

  const formik = useFormik({
    initialValues: {
      street: "",
      street2: "",
      city: "",
      zip_code: "",
      country: "",
      // state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("Form Data", data);
      try {
        setLoadIndicator(true);
        const response = await api.put(
          `vendor/shop/${id}/update/location`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/shop/location/${id}`);
        const shopData = response.data.data;
        console.log("object", shopData);
        formik.setValues(shopData);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
      setLoading(false);
    };
    getData();
  }, [id]);
  return (
    <section>
      <form onSubmit={formik.handleSubmit} className="w-100">
        {loading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="container">
            {/* <h3 className='text-primary py-3'>Shop Address</h3> */}

            <div className="row">
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">Street<span className="text-danger">*</span></label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.street && formik.errors.street
                    ? "is-invalid"
                    : ""
                    }`}
                  name="street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
                {formik.touched.street && formik.errors.street && (
                  <div className="error text-danger">
                    <small>{formik.errors.street}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">Street2</label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.street2 && formik.errors.street2
                    ? "is-invalid"
                    : ""
                    }`}
                  name="street2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street2}
                />
                {formik.touched.street2 && formik.errors.street2 && (
                  <div className="error text-danger">
                    <small>{formik.errors.street2}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">City</label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.city && formik.errors.city
                    ? "is-invalid"
                    : ""
                    }`}
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="error text-danger">
                    <small>{formik.errors.city}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">Zip Code<span className="text-danger">*</span></label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.zip_code && formik.errors.zip_code
                    ? "is-invalid"
                    : ""
                    }`}
                  name="zip_code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip_code}
                />
                {formik.touched.zip_code && formik.errors.zip_code && (
                  <div className="error text-danger">
                    <small>{formik.errors.zip_code}</small>
                  </div>
                )}
              </div>
              {/* <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">State</label>
              </div> */}
              {/* <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                    }`}
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="error text-danger">
                    <small>{formik.errors.state}</small>
                  </div>
                )}
              </div> */}
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label fw-bold">Country<span className="text-danger">*</span></label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.country && formik.errors.country
                    ? "is-invalid"
                    : ""
                    }`}
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="error text-danger">
                    <small>{formik.errors.country}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-end mt-4 mb-3">
          <button
            type="submit"
            className="btn btn-sm btn-outline-primary"
            disabled={loadIndicator}
          >
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

export default Location;
