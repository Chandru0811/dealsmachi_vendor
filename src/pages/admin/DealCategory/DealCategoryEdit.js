import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

import toast from "react-hot-toast";
import Cropper from "react-easy-crop";

function DealCategoryEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("*Name is required"),
    // image: Yup.mixed()
    //   .required("*Image is required")
    //   .test(
    //     "fileSize",
    //     "File size should be less than 2MB",
    //     (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB in bytes
    //   ),

    // active: Yup.string().required("*Select an active status"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image_path: null,
      slug: "",
      // active: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("slug", values.slug);

      formData.append("name", values.name);
      formData.append("image", values.image_path);
      // formData.append("active", values.active);
      formData.append("description", values.description);

      try {
        const response = await api.post(
          `admin/dealCategory/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
      setLoading(true);
      try {
        const response = await api.get(`admin/dealCategory/${id}`);
        formik.setValues({
          name: response.data.data.name || "",
          // active: response.data.data.active || "",
          slug: response.data.data.slug || "",
          description: response.data.data.description || "",
        });
        setPreviewImage(`${ImageURL}${response.data.data.image_path}`);
      } catch (error) {
        toast.error("Error Fetching Data", error.message);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  useEffect(() => {
    const slug = formik.values.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]+/g, "");
    formik.setFieldValue("slug", slug);
  }, [formik.values.name]);


  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/webp",
      ];
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
  // Handle canceling the cropper
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("image_path", ""); // Reset Formik field value for 'image'
    document.querySelector("input[type='file']").value = ""; // Reset the file input field
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

        const targetWidth = 300;
        const targetHeight = 200;
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

      formik.setFieldValue("image_path", file);

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
    <div className="container-fluid minHeight m-">
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
          <div className="">
            <div className="card shadow border-0 mb-2 top-header">
              <div className="container-fluid py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">
                        Edit Deal Category
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
              <div className="container mb-5">
                <div className="row py-4">
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
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Image<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, .svg, .webp"
                      className={`form-control ${formik.touched.image_path && formik.errors.image_path
                        ? "is-invalid"
                        : ""
                        }`}
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                    />
                    <p style={{ fontSize: "13px" }}>
                      Note: Maximum file size is 2MB. Allowed: .png, .jpg,
                      .jpeg, .svg, .webp.
                    </p>

                    {formik.touched.image_path && formik.errors.image_path && (
                      <div className="invalid-feedback">
                        {formik.errors.image_path}
                      </div>
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
                      <div
                        className="position-relative"
                        style={{ height: 400 }}
                      >
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

                    {previewImage && showCropper && (
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
                      rows={5}
                      className="form-control"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="invalid-feedback">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="col-auto">
          <div className="hstack gap-2 justify-content-end">
            <button type="submit" className="btn btn-button btn-sm">
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
    </div>
  );
}

export default DealCategoryEdit;
