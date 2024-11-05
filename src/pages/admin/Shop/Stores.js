import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageURL from "../../../config/ImageURL";

function Stores() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const id = localStorage.getItem("id");
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
                  Company Name                </p>
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
                 Company Legal Name
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
                  Company Email
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
                  Company Phone
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
                  Company Type
                </p>
              </div>
              <div className="col-9">
                <div className="col-9">
                  <p className="text-muted text-sm">
                    :{" "}
                    {data?.shop_type === "1" || data?.shop_type === 1
                      ? "Product"
                      : data?.shop_type === "2" || data?.shop_type === 2
                      ? "Services"
                      : data?.shop_type === "3" || data?.shop_type === 3
                      ? "Product & Services"
                      : "Unknown Type"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="row mb-3 flex-wrap">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  Logo
                </p>
              </div>
              <div className="col-8">
                <p>
                  :{" "}
                  <img
                    src={`${ImageURL}${data?.logo}`}
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
                  External URL
                </p>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm">: {data?.external_url}</p>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3 d-flex justify-content-start align-items-center">
              <p className="text-sm">
                Company Description
              </p>
            </div>
            <div className="col-9">
              <p className="text-muted text-sm"> {data?.description}</p>
            </div>
          </div>
          {/* <div className="col-md-5 col-12">
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  Shop Rating
                </p>
              </div>
              <div className="col-8">
                <p className="text-muted text-sm">: {data?.shop_ratings}</p>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Stores;
