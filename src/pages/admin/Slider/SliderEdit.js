import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import "../../../styles/admin.css";

function SliderEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation schema: make image optional when editing
  const validationSchema = Yup.object({
    order: Yup.string().required("*Select an Order"),
    // image: Yup.mixed().nullable(),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      order: "",
      image: null, // Set the initial image to null
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("order", values.order);

      // Only append the image if it's updated
      if (values.image) {
        formData.append("image", values.image);
      }

      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/slider/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/slider");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error updating the slider.";
        toast.error(errorMessage);
      }
      setLoadIndicator(false);
    },
  });

  // Fetch the slider data for editing
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/slider/${id}`);
        const sliderData = response.data.data;

        // Set initial form values with existing slider data
        formik.setValues({
          order: sliderData.order || "",
          image: null, // Set image to null for now
        });
        setPreviewImage(`${ImageURL}${sliderData.image_path}`);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error Fetching Data";
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  // Handle canceling the cropper
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Unsupported file type. Please select a valid image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB. Please select a smaller image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const targetWidth = 1750;
        const targetHeight = 550;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

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

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            blob.name = "croppedImage.jpeg";
            resolve(blob);
          },
          "image/jpeg",
          1
        );
      };
      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const file = new File([croppedImageBlob], "croppedImage.jpg", {
        type: "image/jpeg",
      });

      // Set the cropped image in Formik
      formik.setFieldValue("image", file);

      const newPreviewURL = URL.createObjectURL(file);
      setPreviewImage(newPreviewURL);

      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }

      setShowCropper(false);
      setImageSrc(null);
    } catch (error) {
      console.error("Error cropping the image:", error);
      toast.error("Failed to crop the image. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className="card shadow border-0 mb-3">
              <div className="row p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h4 ls-tight">Edit Slider</h1>
                  <Link to="/slider">
                    <button type="button" className="btn btn-light btn-sm">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="container card shadow border-0"
              style={{ minHeight: "60vh" }}
            >
              <div className="row mt-3">
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Image<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .svg, .webp"
                    className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""}`}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
                  <p style={{ fontSize: "13px" }}>
                    Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg, .svg, .webp.
                  </p>
                  {formik.touched.image && formik.errors.image && (
                    <div className="invalid-feedback">{formik.errors.image}</div>
                  )}

                  {previewImage && (
                    <div className="my-3">
                      <img
                        src={previewImage}
                        alt="Selected"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  )}

                  {showCropper && (
                    <div className="position-relative" style={{ height: 400 }}>
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1750 / 550}
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
                  <label className="form-label">
                    Order<span className="text-danger">*</span>
                  </label>
                  <select
                    aria-label="Default select example"
                    className={`form-select ${formik.touched.order && formik.errors.order ? "is-invalid" : ""
                      }`}
                    {...formik.getFieldProps("order")}
                  >
                    <option value="">Select an order</option>
                    {[...Array(10)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  {formik.touched.order && formik.errors.order && (
                    <div className="invalid-feedback">{formik.errors.order}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="hstack gap-2 justify-content-end p-2">
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
          </>
        )}
      </form>
    </section>
  );
}

export default SliderEdit;