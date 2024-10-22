import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { Button, Modal } from "react-bootstrap";
// import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";
import ImageURL from "../../../config/ImageURL";

function ProductAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [croppedAreas, setCroppedAreas] = useState([null, null, null, null]);
  const [crops, setCrops] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [zooms, setZooms] = useState([1, 1, 1, 1]);
  const [showCropper, setShowCropper] = useState([false, false, false, false]);
  const [category, setCategory] = useState([]);
  const shop_id = sessionStorage.getItem("shop_id");
  const { id } = useParams();
  const navigate = useNavigate();

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const imageValidation = Yup.mixed()
    .nullable()
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    });
  const validationSchema = Yup.object({
    categoryGroupId: Yup.string().required("Shop Id is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    category_id: Yup.string().required("Category Id is required"),
    // brand: Yup.string().required("Brand is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    discount_percentage: Yup.number()
      .required("Discount is required")
      .max(100, "Discount must be less than 100"),
    discounted_price: Yup.number()
      .required("Discounted Price is required")
      .max(
        Yup.ref("original_price"),
        "The Discounted Price must be same or below the Original Price."
      ),
    // start_date: Yup.date().required("Start Date is required").nullable(),
    // end_date: Yup.date()
    //   .required("End Date is required")
    //   .min(Yup.ref("start_date"), "End Date cannot be before Start Date")
    //   .nullable(),
    // stock: Yup.number()
    //   .required("Stock is required")
    //   .min(0, "Stock cannot be negative"),
    // sku: Yup.string().required("SKU is required"),
    image_url1: imageValidation,
    image_url2: imageValidation,
    image_url3: imageValidation,
    image_url4: imageValidation,
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long"),
  });
  // const validationSchema1 = Yup.object({
  //   catagory_group_id: Yup.string().required("Category Group is required"),
  //   name: Yup.string().required("Name is required"),
  //   icon: Yup.string().required("Imagei s required"),
  //   description: Yup.string().required("Description is required"),
  // });

  const formik = useFormik({
    initialValues: {
      categoryGroupId: "",
      name: "",
      category_id: "",
      deal_type: "",
      brand: "",
      original_price: "",
      coupon_code:"",
      discounted_price: "",
      discount_percentage: "",
      start_date: "",
      end_date: "",
      stock: "",
      sku: "",
      image_url1: null,
      image_url2: null,
      image_url3: null,
      image_url4: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("shop_id", shop_id);
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("deal_type", values.deal_type);
      formData.append("brand", values.brand || "");
      formData.append("coupon_code", values.coupon_code);
      formData.append("original_price", values.original_price);
      formData.append("discounted_price", values.discounted_price);
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("stock", values.stock || "");
      formData.append("sku", values.sku || "");
      if (values.image_url1) {
        formData.append("image1", values.image_url1);
      }
      if (values.image_url2) {
        formData.append("image2", values.image_url2);
      }
      if (values.image_url3) {
        formData.append("image3", values.image_url3);
      }
      if (values.image_url4) {
        formData.append("image4", values.image_url4);
      }
      formData.append("description", values.description);

      const slug = values.name.toLowerCase().replace(/\s+/g, "_");
      const finalSlug = `${slug}_${shop_id}`;
      formData.append("slug", finalSlug);

      console.log("Form Data:", formData);
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
          navigate("/product");
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

  // const formik1 = useFormik({
  //   initialValues: {
  //     catagory_group_id: "",
  //     name: "",
  //     icon: "",
  //     description: "",
  //   },
  //   validationSchema: validationSchema1,
  //   onSubmit: async (values) => {
  //     const formData = new FormData();
  //     formData.append("category_group_id", values.catagory_group_id);
  //     formData.append("name", values.name);
  //     formData.append("icon", values.icon);
  //     formData.append("description", values.description);

  //     const slug = values.name.toLowerCase().replace(/\s+/g, "_");
  //     formData.append("slug", slug);

  //     console.log("Form Data:", values);
  //     try {
  //       const response = await api.post(`vendor/categories/create`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("Response", response);
  //       if (response.status === 200) {
  //         toast.success(response.data.message);
  //         setShowModal(false);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 422) {
  //         const errors = error.response.data.errors;
  //         if (errors) {
  //           Object.keys(errors).forEach((key) => {
  //             errors[key].forEach((errorMsg) => {
  //               toast(errorMsg, {
  //                 icon: <FiAlertTriangle className="text-warning" />,
  //               });
  //             });
  //           });
  //         }
  //       } else {
  //         console.error("API Error", error);
  //         toast.error("An unexpected error occurred.");
  //       }
  //     } finally {
  //       setLoadIndicator(false);
  //       formik1.resetForm();
  //     }
  //   },
  // });

  useEffect(() => {
    const getData1 = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/categorygroups`);
        setAllCategorgroup(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error.message);
      }
      setLoading(false);
    };
    getData1();
    getData();
  }, []);


  useEffect(() => {
    const { original_price, discounted_price } = formik.values;
    if (original_price) {
      if (discounted_price === null || discounted_price === "0") {
        formik.setFieldValue("discounted_percentage", 100);
      } else {
        const discountedPercentage =
          ((original_price - discounted_price) / original_price) * 100;

        const formattedPercentage = Math.floor(discountedPercentage * 10) / 10;
        formik.setFieldValue("discount_percentage", formattedPercentage);
      }
    }
  }, [formik.values.discounted_price]);

  const getData = async () => {
    try {
      const response = await api.get(`vendor/product/${id}/get`);

      const { image_url1, image_url2, image_url3, image_url4, ...rest } =
        response.data.data;
      formik.setValues({
        ...rest,
        start_date: rest.start_date
          ? new Date(rest.start_date).toISOString().split("T")[0]
          : "",
        end_date: rest.end_date
          ? new Date(rest.end_date).toISOString().split("T")[0]
          : "",

        image1: `${ImageURL}${image_url1}`,
        image2: `${ImageURL}${image_url2}`,
        image3: `${ImageURL}${image_url3}`,
        image4: `${ImageURL}${image_url4}`,
      });
    } catch (error) {
      toast.error("Error Fetching Data", error.message);
    }
  };

  const fetchCategory = async (categoryId) => {
    if (categoryId) {
      try {
        const category = await api.get(
          `vendor/categories/categorygroups/${categoryId}`
        );
        setCategory(category.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleCategorygroupChange = (event) => {
    const categoryGroup = event.target.value;
    setCategory([]);
    formik.setFieldValue("categoryGroupId", categoryGroup);
    // formik1.setFieldValue("catagory_group_id", categoryGroup);
    setSelectedCategoryGroup(categoryGroup);
    fetchCategory(categoryGroup);
  };
  useEffect(() => {
    fetchCategory(formik.values.categoryGroupId);
  }, [formik.values.categoryGroupId]);

  // const handleCategoryAdd = () => {
  //   setShowModal(true);
  //   formik1.resetForm();
  // };
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        formik.setFieldError(
          `image_url${index + 1}`,
          "File size is too large. Max 2MB."
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);

        const newShowCropper = [...showCropper];
        newShowCropper[index] = true;
        setShowCropper(newShowCropper);
        formik.setFieldValue(`image_url${index + 1}_originalFileName`, file.name);
        formik.setFieldValue(`image_url${index + 1}_originalFileFormat`, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (index, croppedArea, croppedAreaPixels) => {
    const newCroppedAreas = [...croppedAreas];
    newCroppedAreas[index] = croppedAreaPixels;
    setCroppedAreas(newCroppedAreas);
  };

  const handleCropCancel = (index) => {
    const newShowCropper = [...showCropper];
    newShowCropper[index] = false; // Hide cropper for the specific index
    setShowCropper(newShowCropper);

    const newImages = [...images];
    newImages[index] = null; // Clear the image for this specific index
    setImages(newImages);

    // Reset the Formik field value for this specific image field
    formik.setFieldValue(`image${index + 1}`, "");

    // Reset the specific file input by targeting it using its index
    const fileInput = document.querySelectorAll("input[type='file']")[index];
    if (fileInput) {
      fileInput.value = ""; // Clear the file input value
    }
  };

  const handleCropSave = async (index) => {
    const croppedImageBlob = await getCroppedImg(
      images[index],
      crops[index],
      croppedAreas[index]
    );

    const originalFileName = formik.values[`image_url${index + 1}_originalFileName`];
    const originalFileFormat = formik.values[`image_url${index + 1}_originalFileFormat`];

    const file = new File([croppedImageBlob], originalFileName, {
      type: originalFileFormat,
    });

    formik.setFieldValue(`image_url${index + 1}`, file);
    console.log("file", file)

    const newShowCropper = [...showCropper];
    newShowCropper[index] = false;
    setShowCropper(newShowCropper);
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
          blob.name = "croppedImage.jpeg";
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

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
                    className={`form-select ${formik.touched.categoryGroupId &&
                      formik.errors.categoryGroupId
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("categoryGroupId")}
                    onChange={handleCategorygroupChange}
                    value={formik.values.categoryGroupId} // Ensure value is set from Formik state
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
                    className={`form-select ${formik.touched.category_id && formik.errors.category_id
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("category_id")}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      if (selectedValue === "add_new") {
                        setShowModal(true);
                      } else {
                        formik.setFieldValue("category_id", selectedValue);
                      }
                    }}
                  >
                    <option></option>
                    {category &&
                      category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    {/* {selectedCategoryGroup && (
                  <option
                    value="add_new"
                    style={{ background: "#1c2b36", color: "#fff" }}
                    onClick={handleCategoryAdd}
                  >
                    <PiPlusSquareFill size={20} color="#fff" />
                    Add New Category
                  </option>
                )} */}
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
                    className={`form-select ${formik.touched.deal_type && formik.errors.deal_type
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("deal_type")}
                  >
                    <option></option>
                    <option value="1">Product</option>
                    <option value="2">Service</option>
                    <option value="3">Product & Service</option>
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
                    className={`form-control ${formik.touched.brand && formik.errors.brand
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("brand")}
                  />
                  {formik.touched.brand && formik.errors.brand && (
                    <div className="invalid-feedback">
                      {formik.errors.brand}
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
                    maxLength={825}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">SKU</label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.sku && formik.errors.sku
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("sku")}
                  />
                  {formik.touched.sku && formik.errors.sku && (
                    <div className="invalid-feedback">{formik.errors.sku}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">Coupon Code</label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.coupon_code && formik.errors.coupon_code
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("coupon_code")}
                  />
                  {formik.touched.coupon_code && formik.errors.coupon_code && (
                    <div className="invalid-feedback">{formik.errors.coupon_code}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Original Price<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onInput={(event) => {
                      event.target.value = event.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*?)\..*/g, "$1");
                    }}
                    className={`form-control ${formik.touched.original_price &&
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
                    Discounted Percentage<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    onInput={(event) => {
                      event.target.value = event.target.value
                        .replace(/[^0-9.]/g, "") 
                        .replace(/(\..*?)\..*/g, "$1") 
                        .slice(0, 5); 
                    }}
                    className={`form-control ${formik.touched.discount_percentage &&
                      formik.errors.discount_percentage
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("discount_percentage")}
                  />
                  {formik.touched.discount_percentage &&
                    formik.errors.discount_percentage && (
                      <div className="invalid-feedback">
                        {formik.errors.discount_percentage}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">stock</label>
                  <input
                    type="text"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
                    className={`form-control ${formik.touched.stock && formik.errors.stock
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("stock")}
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <div className="invalid-feedback">
                      {formik.errors.stock}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">Start Date</label>
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
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className={`form-control ${formik.touched.end_date && formik.errors.end_date
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("end_date")}
                  />
                  {formik.touched.end_date && formik.errors.end_date && (
                    <div className="invalid-feedback">
                      {formik.errors.end_date}
                    </div>
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
                      className={`form-control ${formik.touched[`image_url${num}`] &&
                        formik.errors[`image_url${num}`]
                        ? "is-invalid"
                        : ""
                        }`}
                      name={`image_url${num}`}
                      onChange={(e) => handleFileChange(index, e)}
                      onBlur={formik.handleBlur}
                    />
                    <p style={{ fontSize: "13px" }}>
                      Note: Maximum file size is 2MB. Allowed: .png, .jpg,
                      .jpeg, .svg, .webp.
                    </p>
                    {formik.touched[`image_url${num}`] &&
                      formik.errors[`image_url${num}`] && (
                        <div className="invalid-feedback">
                          {formik.errors[`image_url${num}`]}
                        </div>
                      )}

                    {/* Show the image preview if it exists */}
                    {formik.values[`image${num}`] && (
                      <div className="image-preview mt-2">
                        <img
                          src={formik.values[`image${num}`]}
                          alt={`Image ${num} Preview`}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}

                    {showCropper[index] && (
                      <>
                        <div className="crop-container">
                          <Cropper
                            image={images[index]}
                            crop={crops[index]}
                            zoom={zooms[index]}
                            aspect={400 / 266}
                            onCropChange={(crop) => {
                              const newCrops = [...crops];
                              newCrops[index] = crop;
                              setCrops(newCrops);
                            }}
                            onZoomChange={(zoom) => {
                              const newZooms = [...zooms];
                              newZooms[index] = zoom;
                              setZooms(newZooms);
                            }}
                            onCropComplete={(croppedArea, croppedAreaPixels) =>
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
              <div className="hstack p-2">
                <button type="submit" className="btn btn-sm btn-button"
                  disabled={loadIndicator}>
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

export default ProductAdd;
