import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";

const validationSchema = Yup.object({
  street: Yup.string().required("Street 1 is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  country: Yup.string().required("Country is required!"),
  zip_code: Yup.string().required("Zip Code is required!"),
});

const Location = ({ setValueChange }) => {
  const [data, setData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("shop_id");

  const formik = useFormik({
    initialValues: {
      street: "",
      street2: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      address: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      console.log("Form Data", data);
      const address = `${data.street}${data.street2 ? `, ${data.street2}` : ''}, ${data.city}, ${data.state}, ${data.country}, ${data.zip_code}`;
      const formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("street", data.street);
      formdata.append("street2", data.street2);
      formdata.append("city", data.city);
      formdata.append("state", data.state);
      formdata.append("country", data.country);
      formdata.append("zip_code", data.zip_code);
      formdata.append("address", address);
      try {
        const response = await api.post(
          `vendor/shop/${id}/update/location`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
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
        setValueChange(false); 
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/shop/location/${id}`);
        setData(response.data);
        const shopData = response.data.data;
        formik.setValues(shopData);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  const handleFormikChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value === "" ? "" : value); // Set empty strings properly
    setValueChange(true);
  };
  

  return (
    <section className="mt-4">
      <form onSubmit={formik.handleSubmit} className="w-100">
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <div className="container">
            <h3 className='pt-2 pb-4' style={{ color: "#ff0060" }}>Shop Address</h3>
            <div className="row">
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  Street 1<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.street && formik.errors.street
                      ? "is-invalid"
                      : ""
                  }`}
                  name="street"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
                {formik.touched.street && formik.errors.street && (
                  <div className="error text-danger">
                    <small>{formik.errors.street}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  Street 2
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control`}
                  name="street2"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street2}
                />
              </div>
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  City<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                  name="city"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="error text-danger">
                    <small>{formik.errors.city}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  State<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }`}
                  name="state"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="error text-danger">
                    <small>{formik.errors.state}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }`}
                  name="country"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="error text-danger">
                    <small>{formik.errors.country}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  Zip Code<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.zip_code && formik.errors.zip_code
                      ? "is-invalid"
                      : ""
                  }`}
                  name="zip_code"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip_code}
                />
                {formik.touched.zip_code && formik.errors.zip_code && (
                  <div className="error text-danger">
                    <small>{formik.errors.zip_code}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="text-end mt-4 mb-3">
          <button
            type="submit"
            className="btn btn-button btn-sm"
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
};

export default Location;