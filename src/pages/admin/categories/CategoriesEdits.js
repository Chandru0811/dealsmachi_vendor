import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

function CategoriesEdits() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  // const id = sessionStorage.getItem("id");
  const { id } = useParams();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  const validationSchema = Yup.object({
    category_group_id: Yup.string().required("*Select an groupId"),
    // active: Yup.string().required("*Select an Status"),
    description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    slug: Yup.string().required("*name Label is required"),
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
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("category_group_id", values.category_group_id);
      formData.append("active", values.active);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("slug", values.slug);

      if (values.icon) {
        formData.append("icon", values.icon);
      }

      setLoadIndicator(true);
      try {
        const response = await api.post(
          `/admin/categories/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/categories");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/admin/categories/${id}`);
        formik.setValues(response.data.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await api.get("/admin/categoryGroup");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // formik.setValues(datas);
    setLoadIndicator(false);
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
                <h1 className="h4 ls-tight headingColor">Edit Category</h1>
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
                  <option >Select an option</option>
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
                  type="file"
                  name="icon"
                  accept=".png"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("icon", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.icon && formik.errors.icon && (
                  <div className="invalid-feedback">{formik.errors.icon}</div>
                )}
                {/* <div className="mb-3">
                  <img
                    src={`${ImageURL}${formik.values.icon}`}
                    alt="Shop Logo"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div> */}
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
              Update
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesEdits;
