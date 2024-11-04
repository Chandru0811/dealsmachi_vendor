import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function Payments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/payment`);
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
                    PayPal
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data?.payment_id}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Account Holder
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.account_holder}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Account Type
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.account_type}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Account Number
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.account_number}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Bank Name
                  </p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.bank_name}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Bank Address
                  </p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.bank_address}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-3 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    Bank Code
                  </p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">: {data.bank_code}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
