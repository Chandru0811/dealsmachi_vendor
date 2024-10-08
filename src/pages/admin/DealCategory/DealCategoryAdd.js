import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import Cropper from "react-easy-crop";

function DealCategoryAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

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
  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Helper function to get the cropped image
  const getCroppedImg = (imageSrc, crop, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const targetWidth = 300;
        const targetHeight = 200;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Scale the cropped image to fit into the 250x250 pixels canvas
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // Convert the canvas content to a Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          blob.name = "croppedImage.jpeg";
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        crop,
        croppedAreaPixels
      );

      // Convert the Blob to a File object
      const file = new File([croppedImageBlob], "croppedImage.jpg", {
        type: "image/jpeg",
      });

      // Set the file in Formik
      formik.setFieldValue("image", file);

      // Close the cropper
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("image", ""); // Reset Formik field value for 'image'
    document.querySelector("input[type='file']").value = ""; // Reset the file input field
  };

  return (
    <div className="container-fluid minHeight m-0">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">
                    Add Deal Category
                  </h1>
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
        <div
          className="card shadow border-0 my-2"
          style={{ minHeight: "80vh" }}
        >
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

              <div className="col-md-6 col-12 file-input">
                <label className="form-label">
                  Image<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .svg, .webp"
                  className={`form-control ${
                    formik.touched.image && formik.errors.image
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleFileChange}
                />
                <p style={{ fontSize: "13px" }}>
                  Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg, .svg, .webp.
                </p>
                {formik.touched.image && formik.errors.image && (
                  <div className="invalid-feedback">{formik.errors.image}</div>
                )}

                {showCropper && (
                  <div className="crop-container">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={300 / 200}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      cropShape="box"
                      showGrid={false}
                    />
                  </div>
                )}
                {showCropper && (
                  <div className="d-flex justify-content-start mt-3 gap-2">
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={handleCropSave}
                    >
                      Save Cropped Image
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary mt-3"
                      onClick={handleCropCancel}
                    >
                      Cancel
                    </button>
                  </div>
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
    </div>
  );
}

export default DealCategoryAdd;