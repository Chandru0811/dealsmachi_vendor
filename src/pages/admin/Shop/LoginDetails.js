import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../../../config/URL";

function LoginDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/logindetails`);
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
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">Name</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.name}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">Email</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.email}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">Type</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">
                    :{" "}
                    {data.type === "referrer-vendor"
                      ? "Referrer-Vendor"
                      : data.type === "vendor"
                      ? "Vendor"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">Date of Joining</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.created_at.substring(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginDetails;
