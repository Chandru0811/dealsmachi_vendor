import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import Cropper from "react-easy-crop";

function ProductAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allCategorgroup, setAllCategorgroup] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [category, setCategory] = useState([]);
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
  const id = sessionStorage.getItem("shop_id");
  const navigate = useNavigate();
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const imageValidation = Yup.mixed()
    .required("*Image is required")
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    });
  const validationSchema = Yup.object({
    shop_id: Yup.string().required("Caategory Group is required"),
    name: Yup.string()
      .max(25, "Name must be 25 characters or less")
      .required("Name is required"),
    category_id: Yup.string().required("Category Id is required"),
    deal_type: Yup.string().required("Deal Type is required"),
    // brand: Yup.string().required("Brand is required"),
    original_price: Yup.number()
      .required("Original Price is required")
      .min(1, "Original Price must be greater than zero"),
    discounted_percentage: Yup.number()
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
    image1: imageValidation,
    image2: imageValidation,
    image3: imageValidation,
    image4: imageValidation,
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
      shop_id: "",
      name: "",
      category_id: "",
      deal_type: "",
      brand: "",
      original_price: "",
      discounted_price: "",
      discounted_percentage: "",
      start_date: "",
      end_date: "",
      stock: "",
      sku: "",
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      // formData.append("shop_id", values.shop_id);
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
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
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
  //     }
  //   },
  // });

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
    // formik1.setFieldValue("catagory_group_id", categoryGroup);

    setSelectedCategoryGroup(categoryGroup);
    fetchCategory(categoryGroup);
  };

  // const handleCategoryAdd = () => {
  //   formik1.setFieldValue("name", "");
  //   formik1.setFieldValue("icon", "");
  //   formik1.setFieldValue("description", "");
  //   setShowModal(true);
  // };

  useEffect(() => {
    const { original_price, discounted_percentage } = formik.values;

    const timeoutId = setTimeout(() => {
      if (original_price) {
        let discountedPrice;
        if (discounted_percentage === "" || discounted_percentage === null) {
          discountedPrice = original_price;
        } else {
          discountedPrice =
            original_price - (original_price * discounted_percentage) / 100;
        }
        discountedPrice = Math.round(discountedPrice * 100) / 100;
        formik.setFieldValue("discounted_price", discountedPrice);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formik.values.discounted_percentage, formik.values.original_price]);

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
  }, [formik.values.discounted_price]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        formik.setFieldError(
          `image${index + 1}`,
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

        formik.setFieldValue(`image${index + 1}_originalFileName`, file.name);
        formik.setFieldValue(`image${index + 1}_originalFileFormat`, file.type);
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

    const originalFileName =
      formik.values[`image${index + 1}_originalFileName`];
    const originalFileFormat =
      formik.values[`image${index + 1}_originalFileFormat`];

    const file = new File([croppedImageBlob], originalFileName, {
      type: originalFileFormat,
    });

    formik.setFieldValue(`image${index + 1}`, file);

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
                className={`form-select ${formik.touched.shop_id && formik.errors.shop_id
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("shop_id")}
                onChange={handleCategorygroupChange}
                value={formik.values.shop_id} // Ensure value is set from Formik state
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
                className={`form-select ${formik.touched.category_id && formik.errors.category_id
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("category_id")}
              // onChange={(event) => {
              //   const selectedValue = event.target.value;
              //   if (selectedValue === "add_new") {
              //     // formik1.resetForm();
              //     formik1.setFieldValue("name", "");
              //     formik1.setFieldValue("icon", "");
              //     formik1.setFieldValue("description", "");
              //     setShowModal(true);
              //   } else {
              //     formik.setFieldValue("category_id", selectedValue);
              //   }
              // }}
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
                <option value="3">Product and Service</option>
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
                <div className="invalid-feedback">{formik.errors.brand}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
                className={`form-control ${formik.touched.sku && formik.errors.sku ? "is-invalid" : ""
                  }`}
                {...formik.getFieldProps("sku")}
              />
              {formik.touched.sku && formik.errors.sku && (
                <div className="invalid-feedback">{formik.errors.sku}</div>
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
                className={`form-control ${formik.touched.original_price && formik.errors.original_price
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
                onInput={(event) => {
                  let value = event.target.value
                    .replace(/[^0-9.]/g, "") // Only allow numbers and a single decimal point
                    .replace(/(\..*)\./g, "$1") // Prevent multiple decimal points
                    .replace(/^(\d*\.\d{1}).*/, "$1"); // Limit to one decimal places

                  formik.setFieldValue("discounted_percentage", value);
                }}
                {...formik.getFieldProps("discounted_percentage")}
                className={`form-control ${formik.touched.discounted_percentage &&
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
              <label className="form-label">Stock</label>
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
                <div className="invalid-feedback">{formik.errors.stock}</div>
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
                  className={`form-control ${formik.touched[`image${num}`] &&
                    formik.errors[`image${num}`]
                    ? "is-invalid"
                    : ""
                    }`}
                  name={`image${num}`} // Ensure name attribute matches validation schema
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
              Submit
            </button>
          </div>
        </div>
      </form>
      {/* <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik1.handleSubmit}>
            <div className="row py-4">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Category Group<span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  className={`form-control ${
                    formik1.touched.catagory_group_id &&
                    formik1.errors.catagory_group_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik1.getFieldProps("catagory_group_id")}
                  disabled
                >
                  <option></option>
                  {allCategorgroup &&
                    allCategorgroup.map((categorygroup) => (
                      <option key={categorygroup.id} value={categorygroup.id}>
                        {categorygroup.name}
                      </option>
                    ))}
                </select>
                {formik1.touched.catagory_group_id &&
                  formik1.errors.catagory_group_id && (
                    <div className="invalid-feedback">
                      {formik1.errors.catagory_group_id}
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
                    formik1.touched.name && formik1.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik1.getFieldProps("name")}
                />
                {formik1.touched.name && formik1.errors.name && (
                  <div className="invalid-feedback">{formik1.errors.name}</div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Image<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${
                    formik1.touched.icon && formik1.errors.icon
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    formik1.setFieldValue("icon", file);
                  }}
                  accept=".png,.jpeg,.jpg,.gif,.svg"
                  onBlur={formik1.handleBlur}
                />
                {formik1.touched.icon && formik1.errors.icon && (
                  <div className="invalid-feedback">{formik1.errors.icon}</div>
                )}
              </div>

              <div className="col-md-12 col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik1.touched.description && formik1.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik1.getFieldProps("description")}
                />
                {formik1.touched.description && formik1.errors.description && (
                  <div className="invalid-feedback">
                    {formik1.errors.description}
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
                onClick={formik1.handleSubmit}
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
      </Modal> */}
    </section>
  );
}

export default ProductAdd;
