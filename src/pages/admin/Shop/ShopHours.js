import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ShopHours() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`admin/shop/${id}/hours`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-5 p-3">
          {data && data.daily_timing ? (
            Object.keys(data.daily_timing).map((day, index) => (
              <div key={index} className="col-md-6 col-12 mb-3">
                <div className="row">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>{day}:</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">:
                      {data.daily_timing[day].opening} -{" "}
                      {data.daily_timing[day].closing}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Shop Our Found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopHours;
