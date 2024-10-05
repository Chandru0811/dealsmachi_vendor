import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import Cropper from "react-easy-crop";
import { FiAlertTriangle } from "react-icons/fi";

function CategoriesEdits() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  // const id = sessionStorage.getItem("id");
  const { id } = useParams();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const validationSchema = Yup.object({
    category_group_id: Yup.string().required("*Select an groupId"),
    // active: Yup.string().required("*Select an Status"),
    // description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    // slug: Yup.string().required("*name Label is required"),
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
          `/admin/categories/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/categories");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 422) {
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
          toast.error(
            error.response.data.message || "An unexpected error occurred."
          );
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/admin/categories/${id}`);
        const { icon, ...rest } = response.data.data;
        formik.setValues(rest);
        setPreviewImage(`${ImageURL}${response.data.data.icon}`);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
      setLoading(false);
    };

    getData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/admin/categoryGroup");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoadIndicator(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    // formik.setValues(datas);
  }, []);

  useEffect(() => {
    const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
    formik.setFieldValue("slug", slug);
  }, [formik.values.name]);

  // Handle canceling the cropper
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
  };

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

      // Set the cropped image in Formik
      formik.setFieldValue("icon", file);

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
            <div className="card shadow border-0 my-2">
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
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Icon<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, .svg, .webp"
                      className={`form-control ${formik.touched.image && formik.errors.image
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

                    {formik.touched.image && formik.errors.image && (
                      <div className="invalid-feedback">
                        {formik.errors.image}
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
          </>
        )}
      </form>
    </section>
  );
}

export default CategoriesEdits;
