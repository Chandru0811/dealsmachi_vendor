import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function ProductsAdd() {
    const [loadIndicator, setLoadIndicator] = useState(false);

    const validationSchema = Yup.object({
        shop_id: Yup.string().required("Shop Id is required"),
        category_id: Yup.string().required("Category Id is required"),
        brand: Yup.string().required("Brand is required"),
        original_price: Yup.number()
            .required("Original Price is required")
            .min(1, "Original Price must be greater than zero"),
        discounted_price: Yup.number()
            .required("Discounted Price is required")
            .lessThan(
                Yup.ref("original_price"),
                "Discounted Price must be less than Original Price"
            ),
        start_date: Yup.date().required("Start Date is required").nullable(),
        end_date: Yup.date()
            .required("End Date is required")
            .min(Yup.ref("start_date"), "End Date cannot be before Start Date")
            .nullable(),
        // stock: Yup.number()
        //     .required("Stock is required")
        //     .min(0, "Stock cannot be negative"),
        // sku: Yup.string().required("SKU is required"),
        file: Yup.mixed().required("Image is required"),
        description: Yup.string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters long"),
    });

    const formik = useFormik({
        initialValues: {
            shop_id: "",
            category_id: "",
            brand: "",
            slug: "",
            original_price: "",
            discounted_price: "",
            discounted_percentage: "",
            start_date: "",
            end_date: "",
            // stock: "",
            // sku: "",
            file: null,
            description: "",
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form Data:", values);
        },
    });

    useEffect(() => {
        const slug = formik.values.name?.toLowerCase().replace(/\s+/g, "_");
        formik.setFieldValue("slug", slug);
    }, [formik.values.name]);

    return (
        <section className="px-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="card shadow border-0 mb-3">
                    <div className="row p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="h4 ls-tight">Add Deals</h1>
                            <Link to="/products">
                                <button type="button" className="btn btn-light btn-sm">
                                    <span>Back</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="container card shadow border-0"
                    style={{ minHeight: "80vh" }}
                >
                    <div className="row mt-3">
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Category Group<span className="text-danger">*</span>
                            </label>
                            <select
                                type="text"
                                className={`form-select ${formik.touched.shop_id && formik.errors.shop_id
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("shop_id")}
                            >
                                <option></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {formik.touched.shop_id && formik.errors.shop_id && (
                                <div className="invalid-feedback">{formik.errors.shop_id}</div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Category<span className="text-danger">*</span>
                            </label>
                            <select
                                type="text"
                                className={`form-select ${formik.touched.category_id && formik.errors.category_id
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("category_id")}
                            >
                                <option></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {formik.touched.category_id && formik.errors.category_id && (
                                <div className="invalid-feedback">
                                    {formik.errors.category_id}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Deal Type<span className="text-danger">*</span>
                            </label>
                            <select
                                type="text"
                                className={`form-select ${formik.touched.category_id && formik.errors.category_id
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("category_id")}
                            >
                                <option></option>
                                <option value="1">Product</option>
                                <option value="2">Service</option>
                            </select>
                            {formik.touched.category_id && formik.errors.category_id && (
                                <div className="invalid-feedback">
                                    {formik.errors.category_id}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Image<span className="text-danger">*</span>
                            </label>
                            <input
                                type="file"
                                className={`form-control ${formik.touched.file && formik.errors.file ? "is-invalid" : ""
                                    }`}
                                onChange={(event) => {
                                    formik.setFieldValue("file", event.target.files[0]);
                                }}
                                {...formik.getFieldProps("file")}
                            />
                            {formik.touched.file && formik.errors.file && (
                                <div className="invalid-feedback">{formik.errors.file}</div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Brand<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.brand && formik.errors.brand
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("brand")}
                            />
                            {formik.touched.brand && formik.errors.brand && (
                                <div className="invalid-feedback">{formik.errors.brand}</div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Name<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
                                    }`}
                                {...formik.getFieldProps("name")}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Original Price<span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.original_price && formik.errors.original_price
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("original_price")}
                            />
                            {formik.touched.original_price &&
                                formik.errors.original_price && (
                                    <div className="invalid-feedback">
                                        {formik.errors.original_price}
                                    </div>
                                )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Discounted Price<span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.discounted_price &&
                                    formik.errors.discounted_price
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("discounted_price")}
                            />
                            {formik.touched.discounted_price &&
                                formik.errors.discounted_price && (
                                    <div className="invalid-feedback">
                                        {formik.errors.discounted_price}
                                    </div>
                                )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Start Date<span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className={`form-control ${formik.touched.start_date && formik.errors.start_date
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("start_date")}
                            />
                            {formik.touched.start_date && formik.errors.start_date && (
                                <div className="invalid-feedback">
                                    {formik.errors.start_date}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                End Date<span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className={`form-control ${formik.touched.end_date && formik.errors.end_date
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("end_date")}
                            />
                            {formik.touched.end_date && formik.errors.end_date && (
                                <div className="invalid-feedback">{formik.errors.end_date}</div>
                            )}
                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Discounted Percentage<span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.discounted_percentage &&
                                    formik.errors.discounted_percentage
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("discounted_percentage")}
                            />
                            {formik.touched.discounted_percentage &&
                                formik.errors.discounted_percentage && (
                                    <div className="invalid-feedback">
                                        {formik.errors.discounted_percentage}
                                    </div>
                                )}
                        </div>
                     
                        {/* <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Stock<span className="text-danger">*</span>
                            </label>
                            <input
                                type="number"
                                className={`form-control ${formik.touched.stock && formik.errors.stock
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                {...formik.getFieldProps("stock")}
                            />
                            {formik.touched.stock && formik.errors.stock && (
                                <div className="invalid-feedback">{formik.errors.stock}</div>
                            )}
                        </div> */}
                        {/* <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                SKU<span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.sku && formik.errors.sku ? "is-invalid" : ""
                                    }`}
                                {...formik.getFieldProps("sku")}
                            />
                            {formik.touched.sku && formik.errors.sku && (
                                <div className="invalid-feedback">{formik.errors.sku}</div>
                            )}
                        </div> */}

                        <div className="col-md-6 col-12 mb-3">
                            <label className="form-label">
                                Description<span className="text-danger">*</span>
                            </label>
                            <textarea
                                type="text"
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
                <div className="hstack gap-2 justify-content-end p-2">

                    <button type="submit" className="btn btn-sm btn-button">
                        {loadIndicator && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            ></span>
                        )}
                        Submit
                    </button>
                </div>
            </form>

        </section>
    );
}

export default ProductsAdd;
