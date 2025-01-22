import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";
import { FaTrash } from "react-icons/fa";
import ImageURL from "../../../config/ImageURL";

function ProductEdit() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const { id } = useParams();
  const [mediaFields, setMediaFields] = useState([
    { image: "", video: "", selectedType: "image" },
  ]);
  const [cropperStates, setCropperStates] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  console.log("Image is ", imageSrc);
  const [crop, setCrop] = useState([]);
  const [zoom, setZoom] = useState([]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState([]);
  const [originalFileName, setOriginalFileName] = useState([]);
  const [originalFileType, setOriginalFileType] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [category, setCategory] = useState([]);
  const shop_id = localStorage.getItem("shop_id");
  const [couponCode, setCouponCode] = useState("DEALSMACHI");
  const [isCouponChecked, setIsCouponChecked] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validationSchema = Yup.object({
    categoryGroupId: Yup.string().required("Category Group is required"),
    category_id: Yup.string().required("Category is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    deal_type: Yup.string().required("Deal Type is required"),
    delivery_days: Yup.string()
      .test(
        "delivery-days-required",
        "Delivery Days is required",
        function (value) {
          const { deal_type } = this.parent;
          if (deal_type === "1") {
            return !!value;
          }
          return true;
        }
      )
      .notRequired(),
    original_price: Yup.string()
      .test("Original Price is required", function (value) {
        const { deal_type } = this.parent;
        if (deal_type === "1") {
          return !!value;
        }
        return true;
      })
      .notRequired(),
    discounted_price: Yup.string()
      .test("Discounted Price is required", function (value) {
        const { deal_type } = this.parent;
        if (deal_type === "1") {
          return !!value;
        }
        return true;
      })
      .notRequired(),
    discounted_percentage: Yup.string()
      .test("Discounted Percentage is required", function (value) {
        const { deal_type } = this.parent;
        if (deal_type === "1") {
          return !!value;
        }
        return true;
      })
      .notRequired(),
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
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long")
      .max(250, "Description cannot be more than 250 characters long"),

    specifications: Yup.string()
      .notRequired("Specification is required")
      .min(10, "Specification must be at least 10 characters long")
      .max(250, "Specification cannot be more than 250 characters long"),
    coupon_code: Yup.string()
      .matches(
        /^[A-Za-z]+[0-9]{0,4}$/,
        "Coupon code must end with up to 4 digits"
      )
      .required("Coupon code is required"),
    mediaFields: Yup.array()
      .of(
        Yup.object().shape({
          selectedType: Yup.string()
            .required("Media type is required")
            .oneOf(["image", "video"], "Invalid media type"),
          path: Yup.string().test("pathValidation", function (value, context) {
            const { selectedType } = context.parent;
            // Validate only for the selectedType
            if (selectedType === "image") {
              return value && /\.(jpg|jpeg|png|gif|webp)$/i.test(value)
                ? true
                : this.createError({
                    message: "Invalid image format or missing file",
                  });
            }
            if (selectedType === "video") {
              return value && /^(http|https):\/\/[^\s]+$/i.test(value)
                ? true
                : this.createError({
                    message: "Invalid YouTube link or missing URL",
                  });
            }
            return true; // No validation if selectedType is missing
          }),
        })
      )
      .required("Media fields are required"),
  });

  const formik = useFormik({
    initialValues: {
      categoryGroupId: "",
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
      image: null,
      description: "",
      variants: [{ id: Date.now(), value: "" }],
      delivery_days: "",
      specifications: "",
      mediaFields: [{ selectedType: "image", path: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formattedVariants = values.variants
        .map((variant) => variant.value.trim())
        .filter((value) => value !== "")
        .map((value) => value.replace(/,\s*$/, ""));
      console.log("Submitted value", values);
      const formData = new FormData();
      formData.append("shop_id", shop_id);
      formData.append("categoryGroupId", values.categoryGroupId);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("brand", values.brand);
      formData.append("original_price", values.original_price || 0);
      formData.append("discounted_price", values.discounted_price || 0);
      formData.append("discount_percentage", values.discounted_percentage || 0);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("coupon_code", values.coupon_code);
      formData.append("varient", formattedVariants);
      formData.append("description", values.description);
      formData.append("delivery_days", values.delivery_days);
      formData.append("specifications", values.specifications);
      const slug = values.name.toLowerCase().replace(/[\s/\\]+/g, "_");
      const finalSlug = `${slug}_${id}`;
      formData.append("slug", finalSlug);

      formik.values.mediaFields.forEach((field, index) => {
        const mediaIndex = index + 1;

        if (field.selectedType === "image") {
          if (
            field.binaryData instanceof File ||
            field.binaryData instanceof Blob
          ) {
            formData.append(
              `media[${mediaIndex}]`,
              field.binaryData,
              field.path
            );
          }
        } else if (field.selectedType === "video") {
          if (field.path) {
            formData.append(`media_url[${mediaIndex}]`, field.path);
          }
        }
      });

      formData.append("_method", "PUT");
      setLoadIndicator(true);
      try {
        const response = await api.post(
          `vendor/product/${id}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setShowModal(false);
          navigate(`/product/view/${response.data.data.id}`);
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
        categoryGroupId: true,
        name: true,
        category_id: true,
        deal_type: true,
        delivery_days: true,
        brand: true,
        original_price: true,
        discounted_price: true,
        discounted_percentage: true,
        start_date: true,
        end_date: true,
        coupon_code: true,
        image: true,
        description: true,
        specifications: true,
        mediaFields: true,
      });

      const formErrors = formik.errors;
      if (Object.keys(formErrors).length > 0) {
        const fieldLabels = {
          categoryGroupId: "Category Group",
          name: "Name",
          category_id: "Category",
          deal_type: "Deal Type",
          delivery_days: "Delivery Days",
          brand: "Brand",
          original_price: "Original Price",
          discounted_price: "Discounted Price",
          discounted_percentage: "Discounted Percentage",
          start_date: "Start Date",
          end_date: "End Date",
          coupon_code: "Coupon Code",
          image: "Main Image",
          description: "Description cannot be more than 250 characters long",
          mediaFields: "Media Fields",
          specifications:
            "Specification cannot be more than 250 characters long",
        };

        const missedFields = Object.keys(formErrors)
          .map((key) => fieldLabels[key] || key) // Fallback to key if no label found
          .join(", ");

        // Ensure toast is displayed
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

      // Proceed to submit the form
      formik.handleSubmit();
    });
  };

  const addVariant = () => {
    const newVariant = { id: Date.now(), value: "" };
    formik.setFieldValue("variants", [...formik.values.variants, newVariant]);
  };

  const removeVariant = (id) => {
    const updatedVariants = formik.values.variants.filter(
      (variant) => variant.id !== id
    );
    formik.setFieldValue(
      "variants",
      updatedVariants.length > 0
        ? updatedVariants
        : [{ id: Date.now(), value: "" }]
    );
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

    formik.setFieldValue("categoryGroupId", categoryGroup);

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

          const formattedPercentage = parseFloat(
            (Math.round(discountedPercentage * 10) / 10).toFixed(1)
          );
          formik.setFieldValue("discounted_percentage", formattedPercentage);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.discounted_price, formik.values.original_price]);

  const getData = async () => {
    try {
      const response = await api.get(`vendor/product/${id}/get`);

      const data = response.data.data;
      console.log("data", data.product_media);
      const isDiscountCoupon =
        data.coupon_code.startsWith("DEALSMACHI") &&
        !data.coupon_code.includes("V");
      setIsCouponChecked(isDiscountCoupon);

      formik.setValues({
        category_id: data.category_id || "",
        name: data.name || "",
        categoryGroupId: data.categoryGroupId || "",
        deal_type: data.deal_type || "",
        delivery_days: data.delivery_days || "",
        brand: data.brand || "",
        original_price: data.original_price || "",
        discounted_price: data.discounted_price || "",
        discounted_percentage: data.discount_percentage || "",
        start_date: data.start_date.slice(0, 10) || "",
        end_date: data.end_date.slice(0, 10) || "",
        coupon_code: data.coupon_code || "",
        description: data.description || "",
        variants: data.varient
          ? data.varient.split(",").map((value, index) => ({
              id: Date.now() + index,
              value: value.trim(),
            }))
          : [{ id: Date.now(), value: "" }],
        specifications: data.specifications || "",
        mediaFields: data.product_media
          ? data.product_media
              .sort((a, b) => a.order - b.order)
              .map((mediaItem) => ({
                id: mediaItem.id,
                selectedType: mediaItem.type,
                path: mediaItem.path,
              }))
          : [],
      });

      fetchCategory(data.categoryGroupId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCrop = (index, newCrop) => {
    setCrop((prevCrop) => {
      const newCropArray = [...prevCrop];
      newCropArray[index] = newCrop;
      return newCropArray;
    });
  };

  const handleFileChange = (event, index, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const updatedImageSrc = [...imageSrc];
        updatedImageSrc[index] = reader.result;
        setImageSrc(updatedImageSrc);

        const updatedCropperStates = [...cropperStates];
        updatedCropperStates[index] = true;
        setCropperStates(updatedCropperStates);

        const updatedFields = [...formik.values.mediaFields];
        updatedFields[index] = {
          ...updatedFields[index],
          path: file.name,
          binaryData: file,
        };
        formik.setFieldValue("mediaFields", updatedFields);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddMediaField = () => {
    formik.setFieldValue("mediaFields", [
      ...formik.values.mediaFields,
      { selectedType: "image", path: "" },
    ]);
  };

  const handleDelete = async (index, mediaId) => {
    if (mediaId) {
      try {
        const response = await api.delete(
          `vendor/product/media/${mediaId}/delete`
        );

        if (response.status === 200) {
          const updatedFields = [...formik.values.mediaFields];
          updatedFields.splice(index, 1);
          formik.setFieldValue("mediaFields", updatedFields);
          toast.success("Media deleted successfully");
        } else {
          toast.error("Failed to delete media");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the media");
      }
    } else {
      const updatedMediaFields = formik.values.mediaFields.filter(
        (_, i) => i !== index
      );
      formik.setFieldValue("mediaFields", updatedMediaFields);
    }
  };

  const onCropComplete = (index, croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = croppedAreaPixels;
      return updatedState;
    });
  };

  const getCroppedImg = (imageSrc, crop, croppedAreaPixels, index) => {
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
          blob.name = `croppedImage-${index}.jpeg`;
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

  const handleCropSave = async (index) => {
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc[index],
        crop[index],
        croppedAreaPixels[index],
        index
      );

      const file = new File([croppedImageBlob], `croppedImage-${index}.jpeg`, {
        type: "image/jpeg",
      });
      console.log("Image actual get", file);

      const updatedFields = [...formik.values.mediaFields];
      updatedFields[index] = {
        ...updatedFields[index],
        path: file.name,
        binaryData: file,
      };
      formik.setFieldValue("mediaFields", updatedFields);

      const updatedCropperStates = [...cropperStates];
      updatedCropperStates[index] = false;
      setCropperStates(updatedCropperStates);

      const updatedImageSrc = [...imageSrc];
      updatedImageSrc[index] = URL.createObjectURL(file);
      setImageSrc(updatedImageSrc);

      console.log("Cropped image saved successfully!");
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };

  const handleCropCancel = (index) => {
    const updatedCropperStates = [...cropperStates];
    updatedCropperStates[index] = false;
    setCropperStates(updatedCropperStates);

    const updatedImageSrc = [...imageSrc];
    updatedImageSrc[index] = null;
    setImageSrc(updatedImageSrc);

    formik.setFieldValue(`image-${index}`, null);
    const fileInput = document.querySelector(`input[name="image-${index}"]`);
    if (fileInput) fileInput.value = "";
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
        : `DEALSMACHIV${shop_id.padStart(2, "0")}`;

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
      const updatedCoupon = `DEALSMACHIV${shop_id.padStart(2, "0")}`;
      setCouponCode(updatedCoupon);
      formik.setFieldValue("coupon_code", updatedCoupon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.discounted_percentage, isCouponChecked]);

  const handleVideoChange = (e, index) => {
    const updatedFields = [...formik.values.mediaFields];
    updatedFields[index].path = e.target.value;
    formik.setFieldValue("mediaFields", updatedFields);
  };

  const handleTypeChange = (index, type) => {
    const updatedFields = [...formik.values.mediaFields];
    updatedFields[index].selectedType = type;
    updatedFields[index].path = "";
    formik.setFieldValue("mediaFields", updatedFields);
  };
  return (
    <section className="px-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">Edit Deals</h1>
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
                className={`form-select form-select-sm ${
                  formik.touched.categoryGroupId &&
                  formik.errors.categoryGroupId
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("categoryGroupId")}
                onChange={handleCategorygroupChange}
                value={formik.values.categoryGroupId}
              >
                <option value="">Select a category group</option>
                {allCategorgroup &&
                  allCategorgroup.map((categorygroup) => (
                    <option key={categorygroup.id} value={categorygroup.id}>
                      {categorygroup.name}
                    </option>
                  ))}
              </select>
              {formik.touched.categoryGroupId &&
                formik.errors.categoryGroupId && (
                  <div className="invalid-feedback">
                    {formik.errors.categoryGroupId}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Category<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className={`form-select form-select-sm ${
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
                className={`form-select form-select-sm ${
                  formik.touched.deal_type && formik.errors.deal_type
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("deal_type")}
                onChange={(e) => {
                  const selectedDealType = e.target.value;
                  formik.setFieldValue("deal_type", selectedDealType);
                  if (selectedDealType !== "1") {
                    formik.setFieldValue("delivery_days", "");
                    formik.setFieldValue("original_price", "");
                    formik.setFieldValue("discounted_price", "");
                    formik.setFieldValue("discounted_percentage", "");
                    formik.setFieldValue("variants", [
                      { id: Date.now(), value: "" },
                    ]);
                  }
                }}
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
            {(formik.values.deal_type === "1" ||
              formik.values.deal_type === 1) && (
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Delivery Days<span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  className={`form-select form-select-sm ${
                    formik.touched.delivery_days && formik.errors.delivery_days
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("delivery_days")}
                >
                  <option></option>
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days</option>
                  <option value="8">8 Days</option>
                  <option value="9">9 Days</option>
                  <option value="10">10 Days</option>
                </select>
                {formik.touched.delivery_days &&
                  formik.errors.delivery_days && (
                    <div className="invalid-feedback">
                      {formik.errors.delivery_days}
                    </div>
                  )}
              </div>
            )}

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className={`form-control form-control-sm ${
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
                className={`form-control form-control-sm ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("name")}
                maxLength={825}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            {(formik.values.deal_type === "1" ||
              formik.values.deal_type === 1) && (
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
                  className={`form-control form-control-sm ${
                    formik.touched.original_price &&
                    formik.errors.original_price
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
            )}
            {(formik.values.deal_type === "1" ||
              formik.values.deal_type === 1) && (
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Discounted Price<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className={`form-control form-control-sm ${
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
            )}
            {(formik.values.deal_type === "1" ||
              formik.values.deal_type === 1) && (
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Discounted Percentage (%)
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  onInput={(event) => {
                    let value = event.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1")
                      .replace(/^(\d*\.\d{1}).*/, "$1");

                    formik.setFieldValue("discounted_percentage", value);
                  }}
                  {...formik.getFieldProps("discounted_percentage")}
                  className={`form-control form-control-sm ${
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
            )}
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control form-control-sm ${
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
                className={`form-control form-control-sm ${
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
            <>
              <>
                {formik.values.mediaFields
                  .sort((a, b) => a.order - b.order)
                  .map((field, index) => (
                    <div key={index} className="row">
                      <p>Thumbnail {index + 1}</p>
                      <div className="col-12 d-flex align-items-center mb-3">
                        <div className="form-check me-3">
                          <input
                            type="radio"
                            name={`media-type-${index}`}
                            id={`image-${index}`}
                            className="form-check-input"
                            checked={field.selectedType === "image"}
                            onChange={() => handleTypeChange(index, "image")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`image-${index}`}
                          >
                            Image
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            name={`media-type-${index}`}
                            id={`video-${index}`}
                            className="form-check-input"
                            checked={field.selectedType === "video"}
                            onChange={() => handleTypeChange(index, "video")}
                            disabled={index === 0}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`video-${index}`}
                          >
                            Youtube
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label">
                          {field.selectedType === "image" && "Image"}
                          {field.selectedType === "image" && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <input
                          type="file"
                          accept=".png,.jpeg,.jpg,.svg,.webp"
                          name={`image-${index}`}
                          className={`form-control ${
                            formik.errors.mediaFields?.[index]?.path &&
                            field.selectedType === "image"
                              ? "is-invalid"
                              : ""
                          }`}
                          disabled={field.selectedType !== "image"}
                          onChange={(e) => handleFileChange(e, index)}
                        />
                        {field.selectedType === "image" && field.path && (
                          <div className="mt-3">
                            <img
                              src={
                                imageSrc[index] || `${ImageURL}${field.path}`
                              }
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ maxWidth: "200px", maxHeight: "150px" }}
                            />
                          </div>
                        )}
                        {cropperStates[index] &&
                          imageSrc[index] &&
                          field.selectedType === "image" && (
                            <>
                              <div className="crop-container">
                                <Cropper
                                  image={imageSrc[index]}
                                  crop={crop[index] || { x: 0, y: 0 }}
                                  zoom={zoom[index] || 1}
                                  aspect={320 / 240}
                                  onCropChange={(newCrop) =>
                                    updateCrop(index, newCrop)
                                  }
                                  onCropComplete={(
                                    croppedArea,
                                    croppedAreaPixels
                                  ) =>
                                    onCropComplete(
                                      index,
                                      croppedArea,
                                      croppedAreaPixels
                                    )
                                  }
                                />
                              </div>
                              <div className="d-flex justify-content-start mt-3 gap-2">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => handleCropSave(index)}
                                >
                                  Save Cropped Image
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() => handleCropCancel(index)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          )}
                        <div className="invalid-feedback">
                          {formik.errors.mediaFields?.[index]?.path &&
                            field.selectedType === "image" &&
                            formik.errors.mediaFields[index].path}
                        </div>
                      </div>

                      <div className="col-md-6 col-12 mb-3">
                        <label className="form-label">
                          Youtube Link
                          {field.selectedType === "video" && (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.mediaFields?.[index]?.path &&
                            field.selectedType === "video"
                              ? "is-invalid"
                              : ""
                          }`}
                          value={
                            field.selectedType === "video" ? field.path : ""
                          }
                          disabled={field.selectedType !== "video"}
                          onChange={(e) => handleVideoChange(e, index)}
                        />
                        <div className="invalid-feedback">
                          {formik.errors.mediaFields?.[index]?.path &&
                            field.selectedType === "video" &&
                            formik.errors.mediaFields[index].path}
                        </div>
                      </div>

                      <div className="text-end">
                        {formik.values.mediaFields.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(index, field.id ?? null)
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </>

              <div className="text-end mt-3">
                {formik.values.mediaFields.length < 7 && (
                  <button
                    type="button"
                    onClick={handleAddMediaField}
                    className="btn btn-success btn-sm"
                  >
                    Add More
                  </button>
                )}
              </div>
            </>

            <div className="col-12 mb-5">
              <label className="form-label">
                Description<span className="text-danger">*</span>
              </label>
              <textarea
                type="text"
                rows={5}
                className={`form-control form-control-sm ${
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
            <div className="col-12 mb-5">
              <label className="form-label">Specification</label>
              <textarea
                type="text"
                rows={5}
                className={`form-control form-control-sm ${
                  formik.touched.specifications && formik.errors.specifications
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("specifications")}
              />
              {formik.touched.specifications &&
                formik.errors.specifications && (
                  <div className="invalid-feedback">
                    {formik.errors.specifications}
                  </div>
                )}
            </div>
            {(formik.values.deal_type === "1" ||
              formik.values.deal_type === 1) && (
              <div className="col-md-12 mb-3">
                <label className="form-label">Variant</label>
                <div className="row">
                  {formik.values.variants.map((variant, index) => (
                    <div className="col-md-6 col-12 mb-2" key={variant.id}>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name={`variants[${index}].value`}
                          value={variant.value}
                          onChange={(e) => {
                            const valueWithoutComma = e.target.value.replace(
                              /,/g,
                              ""
                            );
                            formik.setFieldValue(
                              `variants[${index}].value`,
                              valueWithoutComma
                            );
                          }}
                          placeholder={`Variant ${index + 1}`}
                        />

                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          onClick={() => removeVariant(variant.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-button"
                  onClick={addVariant}
                >
                  Add Variant
                </button>
              </div>
            )}
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
                    disabled={
                      formik.values.deal_type === 2 ||
                      formik.values.deal_type === "2"
                    }
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
                    disabled={
                      formik.values.deal_type === 2 ||
                      formik.values.deal_type === "2"
                    }
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
                className={`form-control form-control-sm ${
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

export default ProductEdit;
