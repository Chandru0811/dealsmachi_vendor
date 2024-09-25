import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { Modal, Button } from "react-bootstrap";

function CategoryEdit() {
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
      slug: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/categories`, values);
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
      <button
        type="button"
        className="button-btn btn-sm m-2"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inside the modal */}
          <form onSubmit={formik.handleSubmit}>
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
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

              <div className="col-md-6 col-12 mb-3">
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
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default CategoryEdit;
