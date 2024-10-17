import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import ImageURL from "../../../config/ImageURL";

const validationSchema = Yup.object({
  name: Yup.string().required("Shop Name is required!"),
  legal_name: Yup.string().required("Legal Name is required!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "mobile number must be numeric")
    .required("mobile number is required!"),
  shop_type: Yup.string().required("Shop Type is required!"),
  company_registeration_no: Yup.string().required("Company Registration is required!"),
  logo: Yup.mixed().required("Logo is required"),
  external_url: Yup.string()
    .url("Please enter a valid URL")
    .required("External URL is required!"),
  map_url: Yup.string()
    .url("Please enter a valid URL")
    .required("Map URL is required!"),

  banner: Yup.mixed().required("Banner is required!"),
  description: Yup.string().required("Description is required!"),
});

const Store = () => {
  const [data, setData] = useState([]);
  console.log("Data:", data);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("shop_id");
  // const convertToSlug = (name) => {
  //   return name.toLowerCase().replace(/\s+/g, "_");
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      legal_name: "",
      email: "",
      mobile: "",
      company_registeration_no: "",
      shop_type: "",
      logo: null,
      external_url: "",
      map_url: "",
      banner: null,
      description: "",
      shop_ratings: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      console.log("Form Data", data);
      const formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("name", data.name);
      formdata.append("legal_name", data.legal_name);
      formdata.append("email", data.email);
      formdata.append("mobile", data.mobile);
      formdata.append("company_registeration_no", data.company_registeration_no);
      formdata.append("shop_type", data.shop_type);
      formdata.append("map_url", data.map_url);
      formdata.append("external_url", data.external_url);
      formdata.append("description", data.description);
      formdata.append("shop_ratings", data.shop_ratings);

      if (data.logo instanceof File || data.logo instanceof Blob) {
        formdata.append("logo", data.logo);
      }

      if (data.banner instanceof File || data.banner instanceof Blob) {
        formdata.append("banner", data.banner);
      }

      try {
        const response = await api.post(
          `vendor/shop/${id}/update/details`,
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
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/shop/details/${id}`);
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

  return (
    <section>
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
            {/* <h3 className='text-primary py-3'>Generat Settings</h3> */}

            <div className="row">
              <div className="col-md-4 col-12 mb-5 ">
                <label className="form-label">
                  Company Name<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                    }`}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error text-danger">
                    <small>{formik.errors.name}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Legal Name<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.legal_name && formik.errors.legal_name
                      ? "is-invalid"
                      : ""
                    }`}
                  name="legal_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.legal_name}
                />
                {formik.touched.legal_name && formik.errors.legal_name && (
                  <div className="error text-danger">
                    <small>{formik.errors.legal_name}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Email<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="email"
                  className={`form-control ${formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                    }`}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error text-danger">
                    <small>{formik.errors.email}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company mobile<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.mobile && formik.errors.mobile
                      ? "is-invalid"
                      : ""
                    }`}
                  name="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error text-danger">
                    <small>{formik.errors.mobile}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Registeration No<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.company_registeration_no && formik.errors.company_registeration_no
                      ? "is-invalid"
                      : ""
                    }`}
                  name="company_registeration_no"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company_registeration_no}
                />
                {formik.touched.company_registeration_no && formik.errors.company_registeration_no && (
                  <div className="error text-danger">
                    <small>{formik.errors.company_registeration_no}</small>
                  </div>
                )}
              </div>

              <h3 className="text-primary py-3">Company Brand Setup</h3>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Type<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <select
                  type="text"
                  className={`form-select ${formik.touched.shop_type && formik.errors.shop_type
                      ? "is-invalid"
                      : ""
                    }`}
                  name="shop_type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shop_type}
                >
                  <option></option>
                  <option value="1">Product</option>
                  <option value="2">Service</option>
                  <option value="3">Product and Service</option>
                </select>
                {formik.touched.shop_type && formik.errors.shop_type && (
                  <div className="error text-danger">
                    <small>{formik.errors.shop_type}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Logo<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="file"
                  name="file"
                  accept=".png,.jpeg,.jpg,.gif,.svg"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    formik.setFieldValue("logo", file);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="error text-danger">
                    <small>{formik.errors.logo}</small>
                  </div>
                )}

                {formik.values.logo && (
                  <div className="mb-3">
                    {typeof formik.values.logo === "object" ? (
                      <img
                        src={URL.createObjectURL(formik.values.logo)}
                        alt="Shop logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    ) : (
                      <img
                        src={`${ImageURL}${formik.values.logo}`}
                        alt="Shop logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  External Url<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.external_url && formik.errors.external_url
                      ? "is-invalid"
                      : ""
                    }`}
                  name="external_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.external_url}
                />
                {formik.touched.external_url && formik.errors.external_url && (
                  <div className="error text-danger">
                    <small>{formik.errors.external_url}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Map Url<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.map_url && formik.errors.map_url
                      ? "is-invalid"
                      : ""
                    }`}
                  name="map_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.map_url}
                />
                {formik.touched.map_url && formik.errors.map_url && (
                  <div className="error text-danger">
                    <small>{formik.errors.map_url}</small>
                  </div>
                )}
              </div>
              {/* <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                Company Rating<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.shop_ratings && formik.errors.shop_ratings
                      ? "is-invalid"
                      : ""
                  }`}
                  name="shop_ratings"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shop_ratings}
                />
                {formik.touched.shop_ratings && formik.errors.shop_ratings && (
                  <div className="error text-danger">
                    <small>{formik.errors.shop_ratings}</small>
                  </div>
                )}
              </div> */}
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Company Banner<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="file"
                  name="file"
                  accept=".png,.jpeg,.jpg,.gif,svg"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("banner", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.banner && formik.errors.banner && (
                  <div className="error text-danger">
                    <small>{formik.errors.banner}</small>
                  </div>
                )}

                {formik.values.banner && (
                  <div className="mb-3">
                    {typeof formik.values.banner === "object" ? (
                      <img
                        src={URL.createObjectURL(formik.values.banner)}
                        alt="Shop logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    ) : (
                      <img
                        src={`${ImageURL}${formik.values.banner}`}
                        alt="Shop logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </div>
                )}
              </div>
              {/* {formik.values.banner &&
                typeof formik.values.banner === "string" && (
                  <div className="col-12 mb-3">
                    <img
                      src={`${ImageURL}${formik.values.banner}`}
                      alt="Shop Banner"
                    />
                  </div>
                )} */}

              <div className="mb-3">
                <h5 className="mb-4">
                  Company Description<span className="text-danger">*</span>
                </h5>
              </div>

              <div className="row align-items-center">
                <div className="col-12">
                  <textarea
                    type="file"
                    className={`form-control ${formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                      }`}
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    style={{ cursor: "auto" }}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="error text-danger">
                      <small>{formik.errors.description}</small>
                    </div>
                  )}
                </div>
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

export default Store;
