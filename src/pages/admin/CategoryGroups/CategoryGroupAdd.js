import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function CategoryGroupAdd() {
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [logo, setLogo] = useState(null); // this is the file
    const navigate = useNavigate();

    console.log("logo", logo);

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        // icon: Yup.mixed().required("*Icon is required"), // ensuring it's validated as a file
        order: Yup.string().required("*Select an order"),
        // active: Yup.string().required("*Select an active"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: "",
            icon: null,
            order: "",
            active: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("Category Group Data:", values);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("icon", logo); // adding the logo file to FormData
            formData.append("order", values.order);
            formData.append("active", values.active);
            formData.append("description", values.description);

            setLoadIndicator(true);

            try {
                const response = await api.post(`admin/categoryGroup`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // make sure this is multipart/form-data
                    },
                });
                console.log("Response", response);

                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate("/categorygroup");
                    resetForm();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.error;
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
                                    <Link to="/categorygroup">
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
                                        setLogo(file); // setting the selected file
                                    }}
                                />
                                {formik.touched.icon && formik.errors.icon && (
                                    <div className="invalid-feedback">{formik.errors.icon}</div>
                                )}
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label className="form-label">
                                    Order<span className="text-danger">*</span>
                                </label>
                                <select
                                    aria-label="Default select example"
                                    className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("order")}
                                >
                                    <option value="">Select an order</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                {formik.touched.order && formik.errors.order && (
                                    <div className="invalid-feedback">{formik.errors.order}</div>
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

export default CategoryGroupAdd;
