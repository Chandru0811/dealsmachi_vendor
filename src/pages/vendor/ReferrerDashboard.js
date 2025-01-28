import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";

function ReferrerDashboard() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [state, setState] = useState({
    options: {
      colors: ["#ff0060"],
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
      dataLabels: {
        style: {
          fontFamily: "Kanit, sans-serif",
        },
      },
      legend: {
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      xaxis: {
        categories: [
          "2 Vendors",
          "3 Vendors",
          "4 Vendors",
          "5 Vendors",
          "6 Vendors",
          "7 Vendors",
          "8 Vendors",
        ],
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      yaxis: {
        categories: ["2k", "3k", "4k", "5k", "6k", "7k", "8k"],
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      title: {
        style: {
          fontFamily: "Kanit, sans-serif",
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
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
    <>
      <div className="card shadow border-0 mx-4">
        <div className="container">
          <div className="row my-3 d-flex justify-content-between">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-4 col-md-3">
                  <p className="mb-0">Referrer Id</p>
                </div>
                <div className="col-8 col-md-9">
                  <p className="mb-0">: R025</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 text-md-end">
              <div className="row">
                <div className="col-12">
                  <p className="mb-0">Hello Ramesh</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="row d-flex justify-content-between">
              <div className="col">
                <p>Earnings</p>
              </div>
              <div className="col d-flex justify-content-md-end">
                <label className="mt-3">Month</label>
                <input
                  type="month"
                  className="form-control week-input  ms-5"
                  style={{ boxShadow: "none", width: "150px" }}
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 mt-3">
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="100%"
                height="350"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card mx-4 mt-4">
        <div className="container">
          <div className="row my-5">
            <div className="col-md-3 col-12">
              <p>This Months Earning</p>
              <b>₹ 15,000</b>
            </div>
            <div className="col-md-3 col-12">
              <p>Total Earnings</p>
              <b>₹ 25,000</b>
            </div>
            <div className="col-md-4 col-12">
              <p>This Month Referrals</p>
              <b>20</b>
            </div>
            <div className="col-md-2 col-12">
              <p>Total Referrals</p>
              <b>50</b>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="card shadow border-0 mt-3 p-5">
              <h4 className="mb-3">Referrals</h4>
              <table class="table table-bordered mx-2">
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Vendors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>January</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>Febraury</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>March</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>April</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>May</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>June</td>
                    <td>20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card shadow border-0 mt-3 p-5">
              <div className="row d-flex justify-content-between mb-4">
                <div className="col">
                  <h4>Referrals</h4>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferrerDashboard;
