import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street 1 is required"),
  street2: Yup.string().required("Street 2 is required"),
  city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),

});

const Form4 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const formik = useFormik({
      initialValues: {
        street: formData.street,
        street2:formData.street2,
        city:formData.city,
        zip_code: formData.zip_code,
        country:formData.country,
        state: formData.state,

      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Form Data", data);
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
        handleNext();
      },
    });

    const handleStarClick = (rating) => {
      formik.setFieldValue("rating", rating);
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
                  </div>
                </div>

                {/* Street 2 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Street 2<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>

                {/* City */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      City<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>

                {/* Zip Code */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Zip Code<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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

                {/* State */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      State<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
