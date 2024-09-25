import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function DealCategoryEdit() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        image: Yup.mixed().nullable().required("*Image is required"),
        // active: Yup.string().required("*Select an active status"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image: null,
            slug: "",
            // active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoadIndicator(true);
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("slug", values.slug);

            formData.append("name", values.name);
            formData.append("image", values.image);
            // formData.append("active", values.active);
            formData.append("description", values.description);

            try {
                const response = await api.post(`admin/dealCategory/update/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/dealcategories");
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
                const response = await api.get(`admin/dealCategory/${id}`);
                formik.setValues({
                    name: response.data.data.name || "",
                    order: response.data.data.order || "",
                    // active: response.data.data.active || "",
                    description: response.data.data.description || "",
                    image: null, // Image needs to be set via file input
                });
            } catch (error) {
                toast.error("Error Fetching Data", error.message);
            }
        };
        getData();
    }, [id]);
    useEffect(() => {
        const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
        formik.setFieldValue("slug", slug);
    }, [formik.values.name]);
    return (
        <div className="container-fluid minHeight m-">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Edit Deal Category</h1>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="hstack gap-2 justify-content-end">
                                    <Link to="/dealcategories">
                                        <button type="button" className="btn btn-light btn-sm">
                                            Back
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                    <div className="container mb-5">
                        <div className="row py-4">
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Name<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
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
                                    className={`form-select ${formik.touched.active && formik.errors.active ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value=""></option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {formik.touched.active && formik.errors.active && (
                                    <div className="invalid-feedback">{formik.errors.active}</div>
                                )}
                            </div> */}

                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Image<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .gif, .svg"
                                    className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""}`}
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        formik.setFieldValue("image", file);
                                    }}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="invalid-feedback">{formik.errors.image}</div>
                                )}
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows={5}
                                    className="form-control"
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="invalid-feedback">{formik.errors.description}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="hstack gap-2 justify-content-end">
                        <button type="submit" className="btn btn-button btn-sm">
                            {loadIndicator && (
                                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                            )}
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DealCategoryEdit;
