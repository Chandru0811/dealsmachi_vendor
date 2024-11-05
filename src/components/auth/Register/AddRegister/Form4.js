import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import RedMarker from "../../../../assets/pinRed.png";

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street 1 is required"),
  // street2: Yup.string().required("Street 2 is required"),
  // city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  // state: Yup.string().required("State is required"),
});
const LIBRARIES = ["places"];

const Form4 = forwardRef(
  ({ formData, setFormData, handleNext, setLoadIndicators }, ref) => {
    const [center, setCenter] = useState({ lat: 13.0843007, lng: 80.2704622 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [directions, setDirections] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [mapLocated, setMapLocated] = useState(false);
    const [shareableLink, setShareableLink] = useState("");
    // console.log("iframeUrl", shareableLink);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: LIBRARIES,
    });

    const formik = useFormik({
      initialValues: {
        street: formData.street,
        street2: formData.street2,
        city: formData.city,
        zip_code: formData.zip_code,
        country: formData.country,
        state: "Singapore",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        if (mapLocated) {
          setLoadIndicators(true);
          // console.log("Form Data", data);
          const completeFormData = {
            ...formData,
            ...data,
            shop_lattitude: directions.lat,
            shop_longtitude: directions.lng,
            map_url: shareableLink,
          };
          try {
            const response = await api.post(
              `vendor/shopregistration`,
              completeFormData
            );
            console.log("Response", response);
            if (response.status === 200) {
              toast.success(response.data.message);
              sessionStorage.setItem("shop_id", response.data.data.id);
            } else {
              toast.error(response.data.message);
            }
            handleNext();
          } catch (error) {
            if (error.response.status === 422) {
              console.log("Full error response:", error.response);

              const errors = error.response.data.error;

              if (errors) {
                Object.keys(errors).map((key) => {
                  errors[key].map((errorMsg) => {
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
        } else {
          toast.error("Please locate your location for complete store setup")
        }
      },
    });

    const handleStarClick = (rating) => {
      formik.setFieldValue("rating", rating);
    };

    const handleFieldChange = (e) => {
      formik.handleChange(e);
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };

    useImperativeHandle(ref, () => ({
      form4: formik.handleSubmit,
    }));

    useEffect(() => {
      if (
        formik.values.street &&
        formik.values.zip_code &&
        formik.values.country
      ) {
        setShowMap(true);
      } else {
        setShowMap(false);
      }
    }, [formik.values.street, formik.values.zip_code, formik.values.country]);

    const calculateCoordinates = async () => {
      // Check if all required fields are filled out
      if (
        !formik.values.street ||
        !formik.values.zip_code ||
        !formik.values.country
      ) {
        toast.error("Please fill out all required address fields.");
        return;
      }

      const fullAddress = `${formik.values.street}, ${formik.values.city}, ${formik.values.zip_code}, ${formik.values.country}`;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        fullAddress
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const formattedAddress = data.results[0].formatted_address;

          setDirections({ lat: location.lat, lng: location.lng });
          setCenter({ lat: location.lat, lng: location.lng });
          setMarkerPosition({ lat: location.lat, lng: location.lng });

          // Generate a link with the formatted address for detailed info
          const shareLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            formattedAddress
          )}`;
          setShareableLink(shareLink);
          setMapLocated(true);
        } else {
          toast.error("Failed to get coordinates. Check the address.");
        }
      } catch (error) {
        toast.error("An error occurred while calculating coordinates.");
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
                {/* Street 1 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Street 1<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street && formik.errors.street
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street}
                      />
                      {formik.touched.street && formik.errors.street && (
                        <div className="error text-danger">
                          <small>{formik.errors.street}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Street 2 */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">Street 2</label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.street2 && formik.errors.street2
                            ? "is-invalid"
                            : ""
                        }`}
                        name="street2"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.street2}
                      />
                      {formik.touched.street2 && formik.errors.street2 && (
                        <div className="error text-danger">
                          <small>{formik.errors.street2}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* City */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">City</label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.city && formik.errors.city
                            ? "is-invalid"
                            : ""
                        }`}
                        name="city"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <div className="error text-danger">
                          <small>{formik.errors.city}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* State */}
                {/* <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      State<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.state && formik.errors.state
                            ? "is-invalid"
                            : ""
                        }`}
                        name="state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                      />
                      {formik.touched.state && formik.errors.state && (
                        <div className="error text-danger">
                          <small>{formik.errors.state}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}

                {/* Zip Code */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Zip Code<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.zip_code && formik.errors.zip_code
                            ? "is-invalid"
                            : ""
                        }`}
                        name="zip_code"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zip_code}
                      />
                      {formik.touched.zip_code && formik.errors.zip_code && (
                        <div className="error text-danger">
                          <small>{formik.errors.zip_code}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div className="col-12">
                  <div className="mb-3 row align-items-center">
                    <label className="col-md-4 form-label">
                      Country<span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.country && formik.errors.country
                            ? "is-invalid"
                            : ""
                        }`}
                        name="country"
                        onChange={handleFieldChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                      />
                      {formik.touched.country && formik.errors.country && (
                        <div className="error text-danger">
                          <small>{formik.errors.country}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showMap && (
                  <>
                    <div className="col-12 text-end my-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary mt-3"
                        onClick={calculateCoordinates}
                      >
                        Locate Me
                      </button>
                    </div>

                    {/* Google Map */}
                    <GoogleMap
                      center={center}
                      zoom={13}
                      mapContainerStyle={{ width: "100%", height: "400px" }}
                      options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true,
                      }}
                    >
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
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default Form4;
