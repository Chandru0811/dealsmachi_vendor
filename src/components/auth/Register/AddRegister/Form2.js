import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  payment_id: Yup.string().required("paypal  is required"),
  account_holder: Yup.string().required("Account Holder is required"),
  account_type: Yup.string().required("Account Type is required"),
  account_number: Yup.string().required("Account Number is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  bank_address: Yup.string().required("Bank Address is required"),
  bank_code: Yup.string().required("Bank Code is required"),
});

const Form2 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const formik = useFormik({
      initialValues: {
        payment_id: "",
        account_holder: "",
        account_type: "",
        account_number: "",
        bank_name: "",
        bank_address: "",
        bank_code: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        console.log("Form Data", data);
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

    useImperativeHandle(ref, () => ({
      form2: formik.handleSubmit,
    }));

    return (
      <section className="container-fluid my-5">
        <form onSubmit={formik.handleSubmit} className="">
          <h4 className="text-primary mb-5">Payment setup</h4>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      PayPal<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 col-12">
                      <div className="mb-3">
                        {/* <label className="form-label">
                          E-mail<span className="text-danger">*</span>
                        </label> */}
                        <input
                          type="text"
                          className={`form-control ${formik.touched.payment_id && formik.errors.payment_id
                              ? "is-invalid"
                              : ""
                            }`}
                          name="payment_id"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.payment_id}
                        />
                        {formik.touched.payment_id &&
                          formik.errors.payment_id && (
                            <div className="error text-danger">
                              <small>{formik.errors.payment_id}</small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3">
                      <label className=" form-label">
                        Bank Transfer<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-md-8 col-12 border">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Holder</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.account_holder &&
                                formik.errors.account_holder
                                ? "is-invalid"
                                : ""
                              }`}
                            name="account_holder"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_holder}
                          />
                          {formik.touched.account_holder &&
                            formik.errors.account_holder && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_holder}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Type</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.account_type &&
                                formik.errors.account_type
                                ? "is-invalid"
                                : ""
                              }`}
                            name="account_type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_type}
                          />
                          {formik.touched.account_type &&
                            formik.errors.account_type && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_type}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Account Number</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.account_number &&
                                formik.errors.account_number
                                ? "is-invalid"
                                : ""
                              }`}
                            name="account_number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.account_number}
                          />
                          {formik.touched.account_number &&
                            formik.errors.account_number && (
                              <div className="error text-danger">
                                <small>{formik.errors.account_number}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Name</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.bank_name &&
                                formik.errors.bank_name
                                ? "is-invalid"
                                : ""
                              }`}
                            name="bank_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bank_name}
                          />
                          {formik.touched.bank_name &&
                            formik.errors.bank_name && (
                              <div className="error text-danger">
                                <small>{formik.errors.bank_name}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Address</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.bank_address &&
                                formik.errors.bank_address
                                ? "is-invalid"
                                : ""
                              }`}
                            name="bank_address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bank_address}
                          />
                          {formik.touched.bank_address &&
                            formik.errors.bank_address && (
                              <div className="error text-danger">
                                <small>{formik.errors.bank_address}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Bank Code</label>
                          <input
                            type="text"
                            className={`form-control ${formik.touched.bank_code &&
                                formik.errors.bank_code
                                ? "is-invalid"
                                : ""
                              }`}
                            name="bank_code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bank_code}
                          />
                          {formik.touched.bank_code &&
                            formik.errors.bank_code && (
                              <div className="error text-danger">
                                <small>{formik.errors.bank_code}</small>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="notification-container mb-3">
                        <div className="icon">
                          <FaInfoCircle color="#F39C12" size={24} />
                        </div>
                        <div className="message">
                          <strong>
                            Please double-check your account information!
                          </strong>
                          <br />
                          Incorrect or mismatched account name and number can
                          result in withdrawal delays and fees.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default Form2;
