import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street 1 is required"),
  // street2: Yup.string().required("Street 2 is required"),
  // city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  // state: Yup.string().required("State is required"),
});

const Form4 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const formik = useFormik({
      initialValues: {
        street: formData.street,
        street2: formData.street2,
        city: formData.city,
        zip_code: formData.zip_code,
        country: formData.country,
        state: "Singapore",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        // console.log("Form Data", data);
        const completeFormData = { ...formData, ...data };
        try {
          const response = await api.post(
            `vendor/shopregistration`,
            completeFormData
          );
          console.log("Response", response);
          if (response.status === 200) {
            toast.success(response.data.message);
            sessionStorage.setItem("shop_id", response.data.data.id);
          } else {
            toast.error(response.data.message);
          }
          handleNext();
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
          setLoadIndicators(false);
        }
      },
    });

    const handleStarClick = (rating) => {
      formik.setFieldValue("rating", rating);
    };

    const handleFieldChange = (e) => {
      formik.handleChange(e);
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };

    useImperativeHandle(ref, () => ({
      form4: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid py-5">
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-12 col-12">
              <div className="row">
                {/* Street 1 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Street 1<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street && formik.errors.street
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street}
                      />
                      {formik.touched.street && formik.errors.street && (
                        <div className="error text-danger">
                          <small>{formik.errors.street}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Street 2 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">Street 2</label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street2 && formik.errors.street2
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street2"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street2}
                      />
                      {formik.touched.street2 && formik.errors.street2 && (
                        <div className="error text-danger">
                          <small>{formik.errors.street2}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">City</label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.city && formik.errors.city
                            ? "is-invalid"
                            : ""
                        }`}
                        name="city"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="error text-danger">
                          <small>{formik.errors.city}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* State */}
                {/* <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      State<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.state && formik.errors.state
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
                    </div>
                  </div>
                </div> */}

                {/* Zip Code */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Zip Code<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.zip_code && formik.errors.zip_code
                            ? "is-invalid"
                            : ""
                        }`}
                        name="zip_code"
                        onChange={handleFieldChange}
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

                {/* Country */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Country<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.country && formik.errors.country
                            ? "is-invalid"
                            : ""
                        }`}
                        name="country"
                        onChange={handleFieldChange}
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
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default Form4;


