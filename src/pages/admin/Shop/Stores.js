import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageURL from "../../../config/ImageURL";

function Stores() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const id = sessionStorage.getItem("id");
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/details`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error.data.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <div className="row mt-5 p-3">
          <div className="col-md-7 col-12">
            <div className="row mb-3">
              <div className="col-3 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Name</b>
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm">: {data?.name}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Legal Name</b>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted text-sm">: {data?.legal_name}</p>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12">
            <div className="row mb-3">
              <div className="col-3 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Email</b>
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm ">: {data?.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Phone</b>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted text-sm">: {data?.mobile}</p>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12">
            <div className="row mb-3">
              <div className="col-3 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Type</b>
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm">
                  : {data?.shop_type}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Banner Logo</b>
                </p>
              </div>
              <div className="col-8">
                <p>
                  :{" "}
                  <img
                    src={`${ImageURL}${data?.banner}`}
                    alt=""
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12">
            <div className="row mb-3">
              <div className="col-3 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Company Description</b>
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm">: {data?.description}</p>
              </div>
            </div>
          </div>
          {/* <div className="col-md-5 col-12">
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Shop Rating</b>
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted text-sm">: {data?.shop_ratings}</p>
              </div>
            </div>
          </div> */}
          <div className="col-md-7 col-12">
            <div className="row mb-3">
              <div className="col-3 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>External URL</b>
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm">: {data?.external_url}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stores;
