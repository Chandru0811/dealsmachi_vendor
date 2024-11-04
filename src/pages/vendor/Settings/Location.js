import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import RedMarker from "../../../assets/pinRed.png";
const libraries = ["places"];

function Location({ setValueChange }) {
  const id = sessionStorage.getItem("shop_id");
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 13.0843007, lng: 80.2704622 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [data, setData] = useState(null);
  const [place, setPlace] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    map_url: "",
    lat: "",
    lng: "",
  });

  const validationSchema = Yup.object({
    street: Yup.string().required("Street 1 is required"),
    // street2: Yup.string().required("Street 2 is required"),
    // city: Yup.string().required("City is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
    // state: Yup.string().required("State is required"),
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const formik = useFormik({
    initialValues: {
      street: "",
      street2: "",
      city: "",
      zip_code: "",
      country: "",
      // state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("Form Data", data);
      try {
        setLoadIndicator(true);

        const formDataWithAddress = {
          ...data,
          address: place.address,
          street: place.street,
          city: place.city,
          zip_code: place.zip_code,
          country: place.country,
          state: place.state,
          shop_lattitude: place?.lat,
          shop_longtitude: place?.lng,
          map_url: place.map_url,
        };
        console.log("formDataWithAddress", formDataWithAddress);
        const response = await api.put(
          `vendor/shop/${id}/update/location`,
          formDataWithAddress,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
        setValueChange(false);
      }
    },
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`vendor/shop/location/${id}`);
      const shopData = response.data.data;
      console.log("Shop data received:", shopData);

      formik.setValues(shopData);
      setData(shopData);
      // Check for valid latitude and longitude values
      const latitude = parseFloat(shopData.shop_lattitude);
      const longitude = parseFloat(shopData.shop_longtitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
      } else {
        console.warn(
          "Invalid coordinates received, using default center values."
        );
        setCenter({ lat: 13.0843007, lng: 80.2704622 });
        setMarkerPosition({ lat: 13.0843007, lng: 80.2704622 });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error Fetching Data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    console.log("center", center);
    console.log("markposition", markerPosition);
  }, [id]);

  const handleFormikChange = (e) => {
    formik.handleChange(e);
    setValueChange(true);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      setPlace({
        address: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        map_url: "",
        lat: "",
        lng: "",
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
        map_url: origin.url,
        lat: lat,
        lng: lng,
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
    <section>
      <form onSubmit={formik.handleSubmit} className="w-100">
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <div className="container">
            {/* <h3 className='text-primary py-3'>Shop Address</h3> */}

            <div className="row">
              <div className="col-md-3 col-12 mb-5">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-9 col-12 mb-5">
                {`${data.street},${data.city},${data.zip_code},${data.state},${data.country}`}
              </div>
              {/*<div className="col-md-4 col-12 mb-5">
                <label className="form-label">Street2</label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.street2 && formik.errors.street2
                      ? "is-invalid"
                      : ""
                  }`}
                  name="street2"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street2}
                />
                {formik.touched.street2 && formik.errors.street2 && (
                  <div className="error text-danger">
                    <small>{formik.errors.street2}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">City</label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                  name="city"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="error text-danger">
                    <small>{formik.errors.city}</small>
                  </div>
                )}
              </div>
              <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Zip Code<span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.zip_code && formik.errors.zip_code
                      ? "is-invalid"
                      : ""
                  }`}
                  name="zip_code"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip_code}
                />
                {formik.touched.zip_code && formik.errors.zip_code && (
                  <div className="error text-danger">
                    <small>{formik.errors.zip_code}</small>
                  </div>
                )}
              </div> */}
              {/* <div className="col-md-4 col-12 mb-5">
                <label className="form-label">State</label>
              </div> */}
              {/* <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${formik.touched.state && formik.errors.state
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
              </div> */}
              {/* <div className="col-md-4 col-12 mb-5">
                <label className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
              </div> */}
              {/* <div className="col-md-8 col-12 mb-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }`}
                  name="country"
                  onChange={handleFormikChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="error text-danger">
                    <small>{formik.errors.country}</small>
                  </div>
                )}
              </div> */}
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
                        width: "240px",
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
                  {markerPosition ? (
                    <MarkerF
                      position={markerPosition}
                      icon={{
                        url: RedMarker,
                        scaledSize: new window.google.maps.Size(40, 40),
                      }}
                    />
                  ) : null}
                </GoogleMap>
                {formik.errors.street && (
                  <div className="error text-danger">
                    <small>{formik.errors.street}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-end mt-4 mb-3">
          <button
            type="submit"
            className="btn btn-button btn-sm"
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
      </form>
    </section>
  );
}

export default Location;
