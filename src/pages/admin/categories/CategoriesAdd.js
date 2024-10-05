import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";

function CategoriesAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [datas, setDatas] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const navigate = useNavigate();
  const [originalFileName, setOriginalFileName] = useState('');

  const validationSchema = Yup.object({
    category_group_id: Yup.string().required("*Select an groupId"),
    // active: Yup.string().required("*Select an Status"),
    // description: Yup.string().required("*Description is required"),
    name: Yup.string().required("*name is required"),
    icon: Yup.mixed()
      .required("*Icon is required")
      .test(
        "fileSize",
        "File size should be less than 2MB",
        (value) => !value || (value && value.size <= 2 * 1024 * 1024)
      ),
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
      console.log("Form Data:", values);
      const formData = new FormData();
      formData.append("category_group_id", values.category_group_id);
      formData.append("active", values.active);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("icon", values.icon);

      setLoadIndicator(true);
      try {
        const response = await api.post(`admin/categories`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/categories");
        } else if (response.status === 422) {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await api.get("admin/categoryGroup");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const slug = formik.values.name.toLowerCase().replace(/\s+/g, "_");
    formik.setFieldValue("slug", slug);
  }, [formik.values.name]);

  // Handle canceling the cropper
  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("icon", ""); // Reset Formik field value for 'image'
    document.querySelector("input[type='file']").value = ""; // Reset the file input field
  };

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setOriginalFileName(file.name); // Save the original file name
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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to 250x250 pixels
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
            reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = 'croppedImage.jpeg';
          resolve(blob);
        }, 'image/jpeg');
      };
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, crop, croppedAreaPixels);
      const fileName = originalFileName || "croppedImage.jpg";
      const file = new File([croppedImageBlob], fileName, { type: "image/jpeg" });

      // Set the file in Formik
      formik.setFieldValue("icon", file);

      // Close the cropper
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">Add Category</h1>
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
        <div
          className="card shadow border-0 my-2"
        >
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
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>

              <div className="col-md-6 col-12 file-input">
                <label className="form-label">
                  Icon<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .svg, .webp"
                  className={`form-control ${formik.touched.icon && formik.errors.icon ? "is-invalid" : ""
                    }`}
                  onChange={handleFileChange}
                />
                <p style={{ fontSize: "13px" }}>
                  Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg, .svg, .webp.
                </p>
                {formik.touched.icon && formik.errors.icon && (
                  <div className="invalid-feedback">{formik.errors.icon}</div>
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
                {formik.touched.description && formik.errors.description && (
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesAdd;
