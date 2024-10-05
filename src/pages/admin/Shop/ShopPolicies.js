import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function ShopPolicies() {
  // const id = sessionStorage.getItem("id");
  const { id } = useParams();
  const [data, SetData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("object", data);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/policy`);
        SetData(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <div className="row mt-5 pb-3">
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Shipping Policy </p>
              </div>
              <div className="col-6">
                <p
                  className="text-muted text-sm"
                  dangerouslySetInnerHTML={{ __html: data?.shipping_policy }}
                ></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Refund Policy</p>
              </div>
              <div className="col-6">
                <p
                  className="text-muted text-sm"
                  dangerouslySetInnerHTML={{ __html: data?.refund_policy }}
                ></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Cancellation/Return/Exchange Policy</p>
              </div>
              <div className="col-6">
                <p
                  className="text-muted text-sm"
                  dangerouslySetInnerHTML={{
                    __html: data?.cancellation_policy,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopPolicies;
