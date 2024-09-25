import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function DealCategoryAdd() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        // active: Yup.string().required("*Select an active"),
        image: Yup.mixed().required("*Image is required"), // Ensure image is required
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            image: null,
            // active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("Category Group Data:", values);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("image", values.image);
            // formData.append("active", values.active);
            formData.append("description", values.description);

            setLoadIndicator(true);

            try {
                const response = await api.post(`admin/dealCategory`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/dealcategories");
                    resetForm();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
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
                    console.error("API Error", error);
                    toast.error("An unexpected error occurred.");
                }
            } finally {
                setLoadIndicator(false);
            }
        },
    });


    useEffect(() => {
        const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
        formik.setFieldValue("slug", slug);
    }, [formik.values.name]);

    return (
        <div className="container-fluid minHeight m-0">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-2 top-header">
                    <div className="container-fluid py-4">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="d-flex align-items-center gap-4">
                                    <h1 className="h4 ls-tight headingColor">Add Category Group</h1>
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
                    <div className="row mt-3 me-2">
                        <div className="col-12 text-end"></div>
                    </div>
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
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.active && formik.errors.active ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("active")}
                                >
                                    <option value="">Select an active</option>
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
                                        formik.setFieldValue("image", file); // Set the image file for formik
                                    }}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="invalid-feedback">{formik.errors.image}</div>
                                )}
                            </div>

                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    rows={4}
                                    className={`form-control`}
                                    {...formik.getFieldProps("description")}
                                />
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
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DealCategoryAdd;
