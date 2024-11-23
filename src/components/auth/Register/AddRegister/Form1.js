import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useSearchParams } from "react-router-dom";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  legal_name: Yup.string().required("Legal Name is required"),
  company_registeration_no: Yup.string().required("Company Registration is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("E-mail is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .min(8, "Minimum digits is 8")
    .max(10, "Maximum digits is 10"),
  shop_type: Yup.string().required("Shop Type is required"),
  description: Yup.string().required("Description is required"),
});


const Form1 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const formik = useFormik({
      initialValues: {
        owner_id: id,
        name: formData.name || name || "",
        legal_name: formData.legal_name || "",
        company_registeration_no: formData.company_registeration_no || "",
        email: formData.email || email || "",
        mobile: formData.mobile || "",
        external_url: formData.external_url || "",
        shop_ratings: 0,
        shop_type: formData.shop_type || "",
        description: formData.description || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        console.log("Form Data", data);
        const transformedSlug = data.name
          .toLowerCase()
          .replace(/\s+/g, "_");
        const formDataWithSlug = {
          ...data,
          slug: transformedSlug,
        };
        setFormData((prev) => ({
          ...prev,
          ...formDataWithSlug,
        }));
        handleNext();
        setLoadIndicators(false);
      },
    });

    useImperativeHandle(ref, () => ({
      form1: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid py-5">
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Legal Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                      {formik.touched.legal_name &&
                        formik.errors.legal_name && (
                          <div className="error text-danger">
                            <small>{formik.errors.legal_name}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Registration<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                      {formik.touched.company_registeration_no &&
                        formik.errors.company_registeration_no && (
                          <div className="error text-danger">
                            <small>{formik.errors.company_registeration_no}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company E-mail<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="email"
                        readOnly
                        className={`form-control ${formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                          }`}
                        name="email"
                        placeholder="name@gmail.com"
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
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Mobile<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        onInput={(event) => {
                          event.target.value = event.target.value
                            .replace(/[^0-9.]/g, "")
                        }}
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
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Website Url
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${formik.touched.external_url &&
                          formik.errors.external_url
                          ? "is-invalid"
                          : ""
                          }`}
                        name="external_url"
                        placeholder="https://website.com/"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.external_url}
                      />
                      {formik.touched.external_url &&
                        formik.errors.external_url && (
                          <div className="error text-danger">
                            <small>{formik.errors.external_url}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Type<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
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
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label ">
                      Company Description<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <textarea
                        type="text"
                        className={`form-control ${formik.touched.description &&
                          formik.errors.description
                          ? "is-invalid"
                          : ""
                          }`}
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="error text-danger">
                            <small>{formik.errors.description}</small>
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

export default Form1;