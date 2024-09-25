import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaInfoCircle } from "react-icons/fa";
import api from "../../../config/URL";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  payment_id: Yup.string().required("payment id is required"),
  account_holder: Yup.string().required("Account Holder is required"),
  account_type: Yup.string().required("Account Type is required"),
  account_number: Yup.string().required("Account Number is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  bank_address: Yup.string().required("Bank Address is required"),
  bank_code: Yup.string().required("Bank Code is required"),
  // check_account: Yup.boolean()
  //   .oneOf([true], "You must agree to the terms")
  //   .required("Agreement to terms is required"),
});

function Payment() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const id = sessionStorage.getItem("shop_id");
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
      setLoadIndicator(true);
      console.log("Form Data", data);
      try {
        const response = await api.put(
          `vendor/shop/${id}/update/payment`,
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
      try {
        const response = await api.get(`vendor/shop/payment/${id}`);
        const shopData = response.data.data;
        console.log("object", shopData);
        formik.setValues(shopData);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, [id]);
  return (
    <section>
      <form onSubmit={formik.handleSubmit} className="w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label fw-bold">
                <span className="text-danger">*</span>
                Paypal
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.payment_id && formik.errors.payment_id
                    ? "is-invalid"
                    : ""
                }`}
                name="payment_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment_id}
              />
              {formik.touched.payment_id && formik.errors.payment_id && (
                <div className="error text-danger">
                  <small>{formik.errors.payment_id}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-3">
              <label className=" form-label fw-bold">
                Bank Transfer<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 border">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Account Holder</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.account_holder &&
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
                    className={`form-control ${
                      formik.touched.account_type && formik.errors.account_type
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
                    className={`form-control ${
                      formik.touched.account_number &&
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
                    className={`form-control ${
                      formik.touched.bank_name && formik.errors.bank_name
                        ? "is-invalid"
                        : ""
                    }`}
                    name="bank_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bank_name}
                  />
                  {formik.touched.bank_name && formik.errors.bank_name && (
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
                    className={`form-control ${
                      formik.touched.bank_address && formik.errors.bank_address
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
                    className={`form-control ${
                      formik.touched.bank_code && formik.errors.bank_code
                        ? "is-invalid"
                        : ""
                    }`}
                    name="bank_code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bank_code}
                  />
                  {formik.touched.bank_code && formik.errors.bank_code && (
                    <div className="error text-danger">
                      <small>{formik.errors.bank_code}</small>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="col-md-12">
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className={`form-check-input ${formik.touched.check_account &&
                                                formik.errors.check_account
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            id="check_account"
                                            name="check_account"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="check_account"
                                        >
                                            I attest i am the owner and have full
                                            authorization to this bank account
                                        </label>
                                     
                                    </div>
                                </div>
                            </div> */}
              <div className="notification-container mb-3">
                <div className="icon">
                  <FaInfoCircle color="#F39C12" size={24} />
                </div>
                <div className="message">
                  <strong>Please double-check your account information!</strong>
                  <br />
                  Incorrect or mismatched account name and number can result in
                  withdrawal delays and fees.
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Payment;
