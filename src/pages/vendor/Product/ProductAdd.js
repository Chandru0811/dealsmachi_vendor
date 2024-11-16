import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";

function ProductAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [zooms, setZooms] = useState([1, 1, 1, 1]);
  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [category, setCategory] = useState([]);
  const [originalFileName, setOriginalFileName] = useState("");
  const [originalFileType, setOriginalFileType] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [croppedAreas, setCroppedAreas] = useState([null, null, null, null]);
  const [showCropper, setShowCropper] = useState([false, false, false, false]);
  const id = localStorage.getItem("shop_id");
  const [couponCode, setCouponCode] = useState("DEALSMACHI");
  const [isCouponChecked, setIsCouponChecked] = useState(false);
  const navigate = useNavigate();
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const imageValidation = Yup.mixed()
    .required("*Image is required")
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    })
    .test("fileSize", "File size is too large. Max 2MB.", (value) => {
      return !value || (value && value.size <= MAX_FILE_SIZE);
    });
  const validationSchema = Yup.object({
    shop_id: Yup.string().required("Category Group is required"),
    category_id: Yup.string().required("Category is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    deal_type: Yup.string().required("Deal Type is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    discounted_price: Yup.number()
      .required("Discounted Price is required")
      .max(
        Yup.ref("original_price"),
        "The Discounted Price must be same or below the Original Price."
      ),
    discounted_percentage: Yup.number()
      .required("Discount is required")
      .max(100, "Discount must be less than 100"),
    start_date: Yup.string().required("Start Date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .test(
        "endDateValidation",
        "End date must be the same or after the start date",
        function (value) {
          const { start_date } = this.parent;
          if (!start_date || !value) return true;
          return new Date(value) >= new Date(start_date);
        }
      ),
    image1: imageValidation,
    image2: imageValidation,
    image3: imageValidation,
    image4: imageValidation,
    description: Yup.string().min(
      10,
      "Description must be at least 10 characters long"
    ),
    coupon_code: Yup.string().required("Coupon code is required"),
  });

  const formik = useFormik({
    initialValues: {
      shop_id: "",
      name: "",
      category_id: "",
      deal_type: "",
      brand: "",
      original_price: "",
      discounted_price: "",
      discounted_percentage: "",
      start_date: getCurrentDate(),
      end_date: "",
      coupon_code: couponCode,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("shop_id", id);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("brand", values.brand);
      formData.append("original_price", values.original_price);
      formData.append("discounted_price", values.discounted_price);
      formData.append("discount_percentage", values.discounted_percentage);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("coupon_code", values.coupon_code);
      formData.append("image1", values.image1);
      formData.append("image2", values.image2);
      formData.append("image3", values.image3);
      formData.append("image4", values.image4);
      formData.append("description", values.description);
      const slug = values.name.toLowerCase().replace(/\s+/g, "_");
      const finalSlug = `${slug}_${id}`;
      formData.append("slug", finalSlug);

      console.log("Form Data:", formData);
      setLoadIndicator(true);
      try {
        const response = await api.post(`vendor/product`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
          navigate(`/product/print/${response.data.data.id}`);
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      formik.setTouched({
        shop_id: true,
        name: true,
        category_id: true,
        deal_type: true,
        brand: true,
        original_price: true,
        discounted_price: true,
        discounted_percentage: true,
        start_date: true,
        end_date: true,
        coupon_code: true,
        image1: true,
        image2: true,
        image3: true,
        image4: true,
        description: true,
      });

      const formErrors = formik.errors;
      if (Object.keys(formErrors).length > 0) {
        const fieldLabels = {
          shop_id: "Category Group",
          name: "Name",
          category_id: "Category",
          deal_type: "Deal Type",
          brand: "Brand",
          original_price: "Original Price",
          discounted_price: "Discounted Price",
          discounted_percentage: "Discounted Percentage",
          start_date: "Start Date",
          end_date: "End Date",
          coupon_code: "Coupon Code",
          image1: "Image 1",
          image2: "Image 2",
          image3: "Image 3",
          image4: "Image 4",
          description: "Description",
        };

        const missedFields = Object.keys(formErrors)
          .map((key) => fieldLabels[key])
          .join(", ");

        toast.error(
          `Please fill in the following required fields: ${missedFields}`,
          {
            icon: (
              <FiAlertTriangle
                className="text-warning"
                style={{ fontSize: "1.5em", marginRight: "8px" }}
              />
            ),
            style: { maxWidth: "1000px" },
          }
        );
        return;
      }
    });
    formik.handleSubmit();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`vendor/categorygroups`);

        setAllCategorgroup(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, []);

  const fetchCategory = async (categoryId) => {
    try {
      const category = await api.get(
        `vendor/categories/categorygroups/${categoryId}`
      );
      setCategory(category.data.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleCategorygroupChange = (event) => {
    const categoryGroup = event.target.value;
    setCategory([]);

    formik.setFieldValue("shop_id", categoryGroup);

    setSelectedCategoryGroup(categoryGroup);
    fetchCategory(categoryGroup);
  };

  useEffect(() => {
    const { original_price, discounted_price } = formik.values;

    const timeoutId = setTimeout(() => {
      if (original_price) {
        if (discounted_price === null || discounted_price === "0") {
          formik.setFieldValue("discounted_percentage", 100);
        } else {
          const discountedPercentage =
            ((original_price - discounted_price) / original_price) * 100;

          const formattedPercentage =
            Math.round(discountedPercentage * 10) / 10;
          formik.setFieldValue("discounted_percentage", formattedPercentage);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formik.values.discounted_price, formik.values.original_price]);

  const handleFileChange = (index, event) => {
    const file = event?.target?.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size is too large. Max 2MB.");
        event.target.value = null;
        formik.setFieldValue(`image${index + 1}`, null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index] = reader.result;
        setImages(updatedImages);
        setOriginalFileName(file.name);
        setOriginalFileType(file.type);

        // Correctly update showCropper as an array
        const updatedShowCropper = [...showCropper];
        updatedShowCropper[index] = true;
        setShowCropper(updatedShowCropper);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (index, croppedArea, croppedAreaPixels) => {
    const newCroppedAreas = [...croppedAreas];
    newCroppedAreas[index] = croppedAreaPixels;
    setCroppedAreas(newCroppedAreas);
  };

  const getCroppedImg = (imageSrc, crop, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const targetWidth = 320;
        const targetHeight = 240;
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

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        }, "image/jpeg");
      };
      image.onerror = (error) => reject(error);
    });
  };

  const handleCropSave = async (index) => {
    try {
      const croppedImageBlob = await getCroppedImg(
        images[index],
        crop[index],
        croppedAreas[index]
      );

      const fileName = originalFileName || `cropped_image_${index}.jpeg`;
      const file = new File([croppedImageBlob], fileName, {
        type: originalFileType || "image/jpeg",
      });

      // Update the specific image field in formik
      formik.setFieldValue(`image${index + 1}`, file);

      // Update showCropper state to hide the cropper for the saved image
      const updatedShowCropper = [...showCropper];
      updatedShowCropper[index] = false;
      setShowCropper(updatedShowCropper);
    } catch (error) {
      console.error("Error cropping the image:", error);
      toast.error("Failed to crop the image.");
    }
  };

  const handleCropCancel = (index) => {
    const updatedShowCropper = [...showCropper];
    updatedShowCropper[index] = false;
    setShowCropper(updatedShowCropper);

    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);

    formik.setFieldValue(`image${index + 1}`, null);
    document.querySelector(`input[name='image${index + 1}']`).value = "";
  };

  const formatDiscountPercentage = (discounted_percentage) => {
    const roundedDiscount = Math.round(discounted_percentage || 0);
    return roundedDiscount < 10 ? `0${roundedDiscount}` : `${roundedDiscount}`;
  };

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setIsCouponChecked(selectedValue === "discount");

    const formattedDiscount = formatDiscountPercentage(
      formik.values.discounted_percentage
    );
    const newCouponCode =
      selectedValue === "discount"
        ? `DEALSMACHI${formattedDiscount}`
        : `DEALSMACHIV${id.padStart(2, "0")}`;

    setCouponCode(newCouponCode);
    formik.setFieldValue("coupon_code", newCouponCode);
  };

  useEffect(() => {
    const formattedDiscount = formatDiscountPercentage(
      formik.values.discounted_percentage
    );

    if (isCouponChecked) {
      const updatedCoupon = `DEALSMACHI${formattedDiscount}`;
      setCouponCode(updatedCoupon);
      formik.setFieldValue("coupon_code", updatedCoupon);
    } else {
      const updatedCoupon = `DEALSMACHIV${id.padStart(2, "0")}`;
      setCouponCode(updatedCoupon);
      formik.setFieldValue("coupon_code", updatedCoupon);
    }
  }, [formik.values.discounted_percentage, isCouponChecked]);

  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Add Deals</h1>
              <Link to="/product">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container card shadow border-0 pb-5">
          <div className="row mt-3">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Category Group<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${
                  formik.touched.shop_id && formik.errors.shop_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("shop_id")}
                onChange={handleCategorygroupChange}
                value={formik.values.shop_id}
              >
                <option value="">Select a category group</option>
                {allCategorgroup &&
                  allCategorgroup.map((categorygroup) => (
                    <option key={categorygroup.id} value={categorygroup.id}>
                      {categorygroup.name}
                    </option>
                  ))}
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
                className={`form-select ${
                  formik.touched.category_id && formik.errors.category_id
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("category_id")}
              >
                <option></option>
                {category &&
                  category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                className={`form-select ${
                  formik.touched.deal_type && formik.errors.deal_type
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deal_type")}
              >
                <option></option>
                <option value="1">Product</option>
                <option value="2">Service</option>
              </select>
              {formik.touched.deal_type && formik.errors.deal_type && (
                <div className="invalid-feedback">
                  {formik.errors.deal_type}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.brand && formik.errors.brand
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
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
                maxLength={825}
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
                type="text"
                onInput={(event) => {
                  event.target.value = event.target.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
                className={`form-control ${
                  formik.touched.original_price && formik.errors.original_price
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
                type="text"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9.]/g, "") // Allow only numbers and decimal point
                    .replace(/(\..*)\./g, "$1") // Prevent multiple decimal points
                    .replace(/(\.\d{1})./g, "$1"); // Allow only two decimal digits
                }}
                className={`form-control ${
                  formik.touched.discounted_price &&
                  formik.errors.discounted_price
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("discounted_price")}
                value={formik.values.discounted_price}
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
                Discounted Percentage (%)<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                readOnly
                onInput={(event) => {
                  let value = event.target.value
                    .replace(/[^0-9.]/g, "") // Only allow numbers and a single decimal point
                    .replace(/(\..*)\./g, "$1") // Prevent multiple decimal points
                    .replace(/^(\d*\.\d{1}).*/, "$1"); // Limit to one decimal places

                  formik.setFieldValue("discounted_percentage", value);
                }}
                {...formik.getFieldProps("discounted_percentage")}
                className={`form-control ${
                  formik.touched.discounted_percentage &&
                  formik.errors.discounted_percentage
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.discounted_percentage &&
                formik.errors.discounted_percentage && (
                  <div className="invalid-feedback">
                    {formik.errors.discounted_percentage}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.start_date && formik.errors.start_date
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
                End Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${
                  formik?.touched?.end_date && formik.errors.end_date
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("end_date")}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <div className="invalid-feedback">{formik.errors.end_date}</div>
              )}
            </div>

            {[1, 2, 3, 4].map((num, index) => (
              <div key={num} className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Image {num}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg,.svg,.webp"
                  className={`form-control ${
                    formik.touched[`image${num}`] &&
                    formik.errors[`image${num}`]
                      ? "is-invalid"
                      : ""
                  }`}
                  name={`image${num}`}
                  onChange={(e) => handleFileChange(index, e)}
                  onBlur={formik.handleBlur}
                />
                <p style={{ fontSize: "13px" }}>
                  Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg,
                  .svg, .webp.
                </p>
                {/* Show error message for each image */}
                {formik.touched[`image${num}`] &&
                  formik.errors[`image${num}`] && (
                    <div className="invalid-feedback">
                      {formik.errors[`image${num}`]}
                    </div>
                  )}

                {showCropper[index] && (
                  <>
                    <div className="crop-container">
                      <Cropper
                        image={images[index]}
                        crop={crop[index]}
                        zoom={zooms[index]}
                        aspect={320 / 240}
                        onCropChange={(newCrop) => {
                          const newCrops = [...crop];
                          newCrops[index] = newCrop;
                          setCrop(newCrops);
                        }}
                        onZoomChange={(newZoom) => {
                          const newZooms = [...zooms];
                          newZooms[index] = newZoom;
                          setZooms(newZooms);
                        }}
                        onCropComplete={(croppedArea, croppedAreaPixels) =>
                          onCropComplete(index, croppedArea, croppedAreaPixels)
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-start mt-3 gap-2">
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => handleCropSave(index)}
                      >
                        Save Cropped Image {num}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => handleCropCancel(index)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="col-12 mb-5">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                type="text"
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
            <div className="col-md-6 col-12 mt-5 d-flex align-items-center">
              <div className="d-flex align-items-center">
                <div className="form-check mb-3">
                  <input
                    type="radio"
                    name="changeCouponCode"
                    id="vendorCoupon"
                    value="fixed"
                    className="form-check-input"
                    style={{ boxShadow: "none" }}
                    checked={!isCouponChecked}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="vendorCoupon" className="form-label ms-2">
                    Vendor Coupon code
                  </label>
                </div>
                &nbsp; &nbsp; &nbsp;
                <div className="form-check mb-3">
                  <input
                    type="radio"
                    name="changeCouponCode"
                    id="genricCoupon"
                    value="discount"
                    className="form-check-input"
                    style={{ boxShadow: "none" }}
                    checked={isCouponChecked}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="genricCoupon" className="form-label ms-2">
                    Generic Coupon Code
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">Coupon Code</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.coupon_code && formik.errors.coupon_code
                    ? "is-invalid"
                    : ""
                }`}
                value={couponCode}
                readOnly
              />
              {formik.touched.coupon_code && formik.errors.coupon_code && (
                <div className="invalid-feedback">
                  {formik.errors.coupon_code}
                </div>
              )}
            </div>
          </div>

          <div className="hstack p-2">
            <button
              type="submit"
              className="btn btn-sm btn-button"
              disabled={loadIndicator}
              onClick={handlePlaceOrder}
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

export default ProductAdd;
