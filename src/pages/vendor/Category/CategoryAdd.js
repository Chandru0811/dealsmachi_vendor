import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { Modal, Button } from "react-bootstrap";
import { PiPlusSquareFill } from "react-icons/pi";

function CategoryAdd({ show, handleClose, selectedCategoryGroup }) {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object({
    groupId: Yup.string().required("*Select a group ID"),
    description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      groupId: "",
      description: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const transformedSlug = values.name.toLowerCase().replace(/\s+/g, "_");
      const formDataWithSlug = {
        ...values,
        slug: transformedSlug,
      };
      try {
        const response = await api.post(`admin/categories`, formDataWithSlug);
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
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

  return (
    <section className="">
      {/* <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 ls-tight headingColor">Add Category</h1>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-button shadow-none border-0 py-3"
                  onClick={() => setShowModal(true)}
                >
                  <PiPlusSquareFill size={20} />
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

<Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inside the modal */}
          <form onSubmit={formik.handleSubmit}>
            <div className="row py-4">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Category Group Id<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.groupId && formik.errors.groupId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("groupId")}
                >
                  <option value="">Select a group</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                {formik.touched.groupId && formik.errors.groupId && (
                  <div className="invalid-feedback">
                    {formik.errors.groupId}
                  </div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Image<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${
                    formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("file")}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    formik.setFieldValue("file", file);
                  }}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="invalid-feedback">{formik.errors.file}</div>
                )}
              </div>

              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.description && formik.errors.description
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

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                type="submit"
                className="btn btn-sm btn-button shadow-none border-0 ms-3"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CategoryAdd;
