import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

function Locations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/location`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
      setLoading(false);
    };
    getData();
  }, [id]);
  return (
    <div className="container-fluid ">
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
          <div className="row mt-5 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Street</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.street}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Street 2</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.street2}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>City</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.city}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Zip Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.zip_code}</p>
                </div>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>State</b>
                  </p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.state}</p>
                </div>
              </div>
            </div> */}
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Country</b>
                  </p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Locations;
