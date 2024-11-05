import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import RedMarker from "../../../../assets/pinRed.png";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  legal_name: Yup.string().required("Legal Name is required"),
  company_registeration_no: Yup.string().required(
    "Company Registration is required"
  ),
  email: Yup.string()
    .email("Invalid email format")
    .required("E-mail is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .min(8, "Minimum digits is 8")
    .max(10, "Maximum digits is 10"),
  // street: Yup.string().required("Street 1 is required"),
  shop_type: Yup.string().required("Shop Type is required"),
  description: Yup.string().required("Description is required"),
});
const libraries = ["places"];

const Form1 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const { id } = useParams();
    const [center, setCenter] = useState({ lat: 13.0843007, lng: 80.2704622 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [place, setPlace] = useState({
      address: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      map_url: "",
    });

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });

    const formik = useFormik({
      initialValues: {
        owner_id: id,
        name: formData.name || "",
        legal_name: formData.legal_name || "",
        company_registeration_no: formData.company_registeration_no || "",
        email: formData.email || "",
        mobile: formData.mobile || "",
        external_url: formData.external_url || "",
        shop_ratings: 0,
        shop_type: formData.shop_type || "",
        description: formData.description || "",
        street: "",
        city: "",
        zip_code: "",
        country: "",
        state: "",
        address: "",
        shop_lattitude: "",
        shop_longtitude: "",
        map_url: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
      if(markerPosition){
        setLoadIndicators(true);
        
        const formDataWithAddress = {
          ...data,
          address:place.address,
          street: place.street,
          city: place.city,
          zip_code: place.zip_code,
          country: place.country,
          state: place.state,
          shop_lattitude: markerPosition?.lat, 
          shop_longtitude: markerPosition?.lng, 
          // map_url: place.map_url,
        };
    
        const transformedSlug = formDataWithAddress.name.toLowerCase().replace(/\s+/g, "_");
        
        const finalDataToSend = {
          ...formDataWithAddress,
          slug: transformedSlug,
        };
    
        setFormData((prev) => ({
          ...prev,
          ...finalDataToSend,
        }));
    
        try {
          const response = await api.post(
            `vendor/shopregistration`,
            finalDataToSend
          );
          console.log("Response", response);
          if (response.status === 200) {
            toast.success(response.data.message);
            localStorage.setItem("shop_id", response.data.data.id);
            handleNext(); // Move this inside the success block
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
          setLoadIndicators(false);
        }
      }else{
        toast("Enter the location", {
          icon: <FiAlertTriangle className="text-warning" />,
        });
      }
      },
    });

    useImperativeHandle(ref, () => ({
      form1: formik.handleSubmit,
    }));

    const onPlaceChanged = () => {
      if (autocomplete) {
        setPlace({
          address: "",
          street: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
        });
    
        const origin = autocomplete.getPlace();
    
        if (!origin.geometry) {
          console.error("No details available for input:", origin);
          return;
        }
    
        const location = origin.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
    
        // Set formatted address directly
        setPlace((prev) => ({
          ...prev,
          address: origin.formatted_address,
          map_url:origin.url,
        }));
    
        let streetParts = []; 
    
        origin.address_components.forEach((component) => {
          const types = component.types;
    
          if (types.includes("plus_code")) {
            streetParts.push(component.long_name);
          }
          if (types.includes("street_number")) {
            streetParts.push(component.long_name);
          }
    
          if (types.includes("route")) {
            streetParts.push(component.long_name);
          }
          if (types.includes("neighborhood")) {
            streetParts.push(component.long_name);
          }
          if (types.includes("route")) {
            streetParts.push(component.long_name);
          }
    
          if (
            types.includes("sublocality_level_2") ||
            types.includes("sublocality")
          ) {
            streetParts.push(component.long_name);
          }
    
          if (types.includes("locality")) {
            setPlace((prev) => ({
              ...prev,
              city: component.long_name,
            }));
          }
    
          if (types.includes("administrative_area_level_1")) {
            setPlace((prev) => ({
              ...prev,
              state: component.long_name,
            }));
          }
    
          if (types.includes("postal_code")) {
            setPlace((prev) => ({
              ...prev,
              zip_code: component.long_name,
            }));
          }
    
          if (types.includes("country")) {
            setPlace((prev) => ({
              ...prev,
              country: component.long_name,
            }));
          }
        });
    
        setPlace((prev) => ({
          ...prev,
          street: streetParts.join(", "),
        }));
    
        console.log("Updated place data:", origin);
        console.log("Latitude:", lat, "Longitude:", lng);
    
        // Update center and marker position on the map
        setCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
      }
    };

    if (!isLoaded) {
      return (
        <div className="darksoul-layout">
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid py-5">
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="error text-danger">
                          <small>{formik.errors.name}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Legal Name<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.legal_name && formik.errors.legal_name
                            ? "is-invalid"
                            : ""
                        }`}
                        name="legal_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.legal_name}
                      />
                      {formik.touched.legal_name &&
                        formik.errors.legal_name && (
                          <div className="error text-danger">
                            <small>{formik.errors.legal_name}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Registration<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.company_registeration_no &&
                          formik.errors.company_registeration_no
                            ? "is-invalid"
                            : ""
                        }`}
                        name="company_registeration_no"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company_registeration_no}
                      />
                      {formik.touched.company_registeration_no &&
                        formik.errors.company_registeration_no && (
                          <div className="error text-danger">
                            <small>
                              {formik.errors.company_registeration_no}
                            </small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      E-mail<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        name="email"
                        placeholder="name@gmail.com"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="error text-danger">
                          <small>{formik.errors.email}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Mobile<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        onInput={(event) => {
                          event.target.value = event.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                        }}
                        className={`form-control ${
                          formik.touched.mobile && formik.errors.mobile
                            ? "is-invalid"
                            : ""
                        }`}
                        name="mobile"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile}
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <div className="error text-danger">
                          <small>{formik.errors.mobile}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">Website Url</label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.external_url &&
                          formik.errors.external_url
                            ? "is-invalid"
                            : ""
                        }`}
                        name="external_url"
                        placeholder="https://website.com/"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.external_url}
                      />
                      {formik.touched.external_url &&
                        formik.errors.external_url && (
                          <div className="error text-danger">
                            <small>{formik.errors.external_url}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Company Type<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <select
                        type="text"
                        className={`form-select ${
                          formik.touched.shop_type && formik.errors.shop_type
                            ? "is-invalid"
                            : ""
                        }`}
                        name="shop_type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.shop_type}
                      >
                        <option></option>
                        <option value="1">Product</option>
                        <option value="2">Service</option>
                        <option value="3">Product and Service</option>
                      </select>
                      {formik.touched.shop_type && formik.errors.shop_type && (
                        <div className="error text-danger">
                          <small>{formik.errors.shop_type}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label ">
                      Description<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <textarea
                        type="text"
                        className={`form-control ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="error text-danger">
                            <small>{formik.errors.description}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    options={{
                      zoomControl: true,
                      streetViewControl: true,
                      mapTypeControl: true,
                      fullscreenControl: true,
                    }}
                  >
                    <Autocomplete
                      onLoad={(autoC) => {
                        autoC.setComponentRestrictions({ country: "IN" });
                        setAutocomplete(autoC);
                      }}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input
                        type="text"
                        placeholder="Enter a location"
                        className="form-control mt-2 mb-3"
                        style={{
                          boxSizing: "border-box",
                          border: "1px solid transparent",
                          width: "400px",
                          height: "32px",
                          padding: "0 12px",
                          borderRadius: "3px",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                          fontSize: "14px",
                          outline: "none",
                          textOverflow: "ellipses",
                          position: "absolute",
                          left: "50%",
                          marginLeft: "-120px",
                        }}
                      />
                    </Autocomplete>
                    {markerPosition && (
                      <MarkerF
                        position={markerPosition}
                        icon={{
                          url: RedMarker,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                      />
                    )}
                  </GoogleMap>
                  {formik.errors.street && (
                    <div className="error text-danger">
                      <small>{formik.errors.street}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default Form1;
