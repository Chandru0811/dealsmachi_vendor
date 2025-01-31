import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchAllReferrerVendorWithIds from "../../List/ReferrerVendorList";
import toast from "react-hot-toast";
import fetchAllReferredVendorWithIds from "../../List/ReferedVendor";
import api from "../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";

function ReferrerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendorvr, setVendorvr] = useState([]);
  const [referedv, setReferedv] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    referrer_id: Yup.string().required("*Select a referrer name"),
    vendor_id: Yup.string().required("*Select a vendor name"),
    amount: Yup.string().required("*Amount is required"),
    date: Yup.string().required("*Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      referrer_id: "",
      vendor_id: "",
      amount: "",
      referrer_name: "",
      date: "",
      referrer_number: "",
      vendor_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedReferrer = vendorvr.find(
        // eslint-disable-next-line eqeqeq
        (v) => v.id == values.referrer_id
      );
      // eslint-disable-next-line eqeqeq
      const selectedVendor = referedv.find((v) => v.id == values.vendor_id);
      const payload = {
        ...values,
        referrer_name: selectedReferrer?.name,
        referrer_number: `DMR500${selectedReferrer?.id}`,
        vendor_name: selectedVendor?.name,
      };

      setLoadIndicator(true);
      try {
        const response = await api.put(`/admin/referrer/update/${id}`, payload);

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/referrer");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
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
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleReferrerChange = (event) => {
    const referrer = event.target.value;
    formik.setFieldValue("referrer_id", referrer);
    setReferedv(null);
    fetchReferredVendor(referrer);
  };

  const fetchData = async () => {
    try {
      const vendorvrData = await fetchAllReferrerVendorWithIds();
      setVendorvr(vendorvrData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchReferredVendor = async (referrer_id) => {
    try {
      const referedvendorData = await fetchAllReferredVendorWithIds(
        referrer_id
      );
      setReferedv(referedvendorData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/admin/referrer/${id}`);
        const data = response.data.data;
        formik.setValues(data);
        fetchReferredVendor(data.referrer_id);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
      setLoading(false);
    };

    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <h1 className="h4 ls-tight headingColor">Edit Referral Amount</h1>
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
                      Referrer Name<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.referrer_id && formik.errors.referrer_id
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("referrer_id")}
                      onChange={handleReferrerChange}
                    >
                      <option></option>
                      {vendorvr &&
                        vendorvr.map((referrer_id) => (
                          <option key={referrer_id.id} value={referrer_id.id}>
                            {referrer_id.name} - DMR500{referrer_id.id}
                          </option>
                        ))}
                    </select>
                    {formik.touched.referrer_id &&
                      formik.errors.referrer_id && (
                        <div className="invalid-feedback">
                          {formik.errors.referrer_id}
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
                        formik.touched.vendor_id && formik.errors.vendor_id
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("vendor_id")}
                    >
                      <option></option>
                      {referedv &&
                        referedv.map((vendor_id) => (
                          <option key={vendor_id.id} value={vendor_id.id}>
                            {vendor_id.name}
                          </option>
                        ))}
                    </select>
                    {formik.touched.vendor_id && formik.errors.vendor_id && (
                      <div className="invalid-feedback">
                        {formik.errors.vendor_id}
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
                      <div className="invalid-feedback">
                        {formik.errors.date}
                      </div>
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
                      <div className="invalid-feedback">
                        {formik.errors.amount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="hstack p-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-button"
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
            </div>
          </>
        )}
      </form>
    </section>
  );
}

export default ReferrerEdit;
