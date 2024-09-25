import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function CategoriesAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [logo, setLogo] = useState(null);

  const validationSchema = Yup.object({
    category_group_id: Yup.string().required("*Select an groupId"),
    // active: Yup.string().required("*Select an Status"),
    description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    // icon: Yup.string().required("*Icon is required"),
  });

  const formik = useFormik({
    initialValues: {
      category_group_id: "",
      active: "",
      description: "",
      name: "",
      slug: "",
      icon: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      const formData = new FormData();
      formData.append("category_group_id", values.category_group_id);
      formData.append("active", values.active);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("icon", logo);

      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/categories`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/categories");
        } else if (response.status === 422) {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await api.get("admin/categoryGroup");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
    formik.setFieldValue("slug", slug);
  }, [formik.values.name]);

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">Add Category</h1>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/categories">
                    <button type="button" className="btn btn-light btn-sm">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card shadow border-0 my-2"
          style={{ minHeight: "80vh" }}
        >
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Category Group Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${formik.touched.category_group_id &&
                    formik.errors.category_group_id
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("category_group_id")}
                >
                  <option value=""></option>
                  {datas &&
                    datas.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {formik.touched.category_group_id &&
                  formik.errors.category_group_id && (
                    <div className="invalid-feedback">
                      {formik.errors.category_group_id}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${formik.touched.name && formik.errors.name
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>

              {/* <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Active<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${formik.touched.active && formik.errors.active
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("active")}
                >
                  <option>Select an option</option>
                  <option value="0">Active</option>
                  <option value="1">InActive</option>
                </select>
                {formik.touched.active && formik.errors.active && (
                  <div className="invalid-feedback">
                    {formik.errors.active}
                  </div>
                )}
              </div> */}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Icon<span className="text-danger">*</span>
                </label>
                <input
                  name="icon"
                  type="file"
                  className={`form-control`}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setLogo(file);
                  }}
                />
                {formik.touched.icon && formik.errors.icon && (
                  <div className="invalid-feedback">{formik.errors.icon}</div>
                )}
              </div>
              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${formik.touched.description && formik.errors.description
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="hstack gap-2 justify-content-end">
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesAdd;
