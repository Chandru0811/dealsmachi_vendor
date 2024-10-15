import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";
import dashgraph from "../../assets/dashgraph.png";
import dashgraph2 from "../../assets/dashgraph2.png";
import graph5 from "../../assets/graph5.png";
import graph4 from "../../assets/graph4.png";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Card } from "react-bootstrap";

function DashboardV() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [state, setState] = useState({
    options: {
      colors: ["#9349ff", "#FFB63A", "#74aef0"],
      chart: {
        id: "basic-bar",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
        },
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
      {
        name: "series-2",
        data: [3, 70, 5, 30, 22, 50, 80],
      },
      {
        name: "series-3",
        data: [30, 40, 45, 30, 49, 60, 70],
      },
    ],
  });
  useEffect(() => {
    const getCurrentWeek = () => {
      const currentDate = new Date();
      const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear =
        (currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000);
      const weekNumber = Math.ceil(
        (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
      );
      return `${currentDate.getFullYear()}-W${String(weekNumber).padStart(
        2,
        "0"
      )}`;
    };

    setCurrentWeek(getCurrentWeek());
  }, []);

  return (
    <div className="card shadow border-0 mx-4" style={{ minHeight: "90vh" }}>
      <div className="row card-container p-5">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card style={{ background: "#1A2E86", borderRadius: "8px" }}>
            <div className="card-content p-2" style={{ minHeight: "150px" }}>
              <div className="d-flex justify-content-between">
                <h2 className="text-white">9.823</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-2">Members online</p>
              <img src={dashgraph} alt="" className="img-fluid" />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card style={{ background: "#237BFF", borderRadius: "8px" }}>
            <div className="card-content p-2" style={{ minHeight: "150px" }}>
              <div className="d-flex justify-content-between">
                <h2 className="text-white">9.823</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-2">Members online</p>
              <img src={dashgraph2} alt="" className="img-fluid" />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card style={{ background: "#FFB63A", borderRadius: "8px" }}>
            <div className="card-content p-2" style={{ minHeight: "150px" }}>
              <div className="d-flex justify-content-between">
                <h2 className="text-white">9.823</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-4">Members online</p>
              <img src={graph5} alt="" className="img-fluid" />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card style={{ background: "#eb4034", borderRadius: "8px" }}>
            <div className="card-content p-2" style={{ minHeight: "150px" }}>
              <div className="d-flex justify-content-between">
                <h2 className="text-white">9.823</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-4">Members online</p>
              <img src={graph4} alt="" className="img-fluid" />
            </div>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="d-flex">
          <select className="form-select w-25 ms-5">
            <option selected>Select a Product</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
          </select>
          <input
            type="week"
            className="form-control w-25 ms-2"
            value={currentWeek}
            onChange={(e) => setCurrentWeek(e.target.value)}
          />
        </div>
        <div className="col-12">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="100%"
            height="350"
          />
        </div>

        <div className="col-md-6 col-12">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="100%"
          />
        </div>
        <div className="col-md-6 col-12">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardV;
