import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ShopHours() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/hours`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="container-fluid">
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
            {data && data.daily_timing ? (
              Object.keys(data.daily_timing).map((day, index) => (
                <div key={index} className="col-md-6 col-12 mb-3">
                  <div className="row">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        {day.toUpperCase()}:
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.daily_timing?.[day]?.opening ? convertTo12HourFormat(data.daily_timing[day].opening) : ""} -{" "}
                        {data.daily_timing?.[day]?.closing ? convertTo12HourFormat(data.daily_timing[day].closing) : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Shop Hours Found!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopHours;
