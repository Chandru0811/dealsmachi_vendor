import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";
import api from "../../config/URL";

function ReferrerDashboard() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const referrerCode = localStorage.getItem("referrer_code");
  const referrerName = localStorage.getItem("name");
// console.log(dashboardData?.total_data?.total_count_month);

 const formatMonth = (month) => {
   const [year, monthNum] = month.split("-");
   const date = new Date(`${year}-${monthNum}-01`);
   const options = { year: "numeric", month: "short" };
   return date.toLocaleDateString("en-IN", options);
 };

  const fetchDashboardData = async (month) => {
    try {
      const response = await api.get(`vendor/referrerDashboard?month=${month}`);
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    const getCurrentMonth = () => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    };

    const month = getCurrentMonth();
    setCurrentMonth(month);
    fetchDashboardData(month);
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setCurrentMonth(selectedMonth);
    fetchDashboardData(selectedMonth);
  };

 const selectedMonthChart = {
   options: {
     colors: ["#ff0060"],
     chart: {
       id: "selected-month-report",
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
     xaxis: {
       categories: dashboardData?.current_month_report?.vendors || [],
       title: {
        text: "Vendors",
        style: {
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "Kanit, sans-serif",
        },
      },
       labels: {
         style: {
           fontFamily: "Kanit, sans-serif",
         },
       },
     },
     yaxis: {
      title: {
        text: "Amount",
        style: {
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "Kanit, sans-serif",
        },
      },
       labels: {
         style: {
           fontFamily: "Kanit, sans-serif",
         },
       },
     },
     title: {
       text: "Monthly Earnings",
       style: {
         fontFamily: "Kanit, sans-serif",
         fontWeight: 500,
       },
     },
   },
   series: [
     {
       name: "Earnings",
       data: dashboardData?.current_month_report?.amounts || [],
     },
   ],
 };

  const lastSixMonthChart = {
    options: {
      colors: ["#ff0060"],
      chart: {
        id: "selected-month-report",
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
      xaxis: {
        categories:
          dashboardData?.last_six_months_report?.months?.map(formatMonth) || [],
          title: {
            text: "Months",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Kanit, sans-serif",
            },
          },
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      yaxis: {
        title: {
          text: "Amount",
          style: {
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Kanit, sans-serif",
          },
        },
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      title: {
        text: "Last Six Month Earnings",
        style: {
          fontFamily: "Kanit, sans-serif",
          fontWeight: 500,
        },
      },
    },
    series: [
      {
        name: "Earnings",
        data: dashboardData?.last_six_months_report?.revenues || [],
      },
    ],
  };

  // useEffect(() => {
  //   const getCurrentWeek = () => {
  //     const currentDate = new Date();
  //     const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  //     const pastDaysOfYear =
  //       (currentDate - firstDayOfYear) / (24 * 60 * 60 * 1000);
  //     const weekNumber = Math.ceil(
  //       (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
  //     );
  //     return `${currentDate.getFullYear()}-W${String(weekNumber).padStart(
  //       2,
  //       "0"
  //     )}`;
  //   };

  //   setCurrentWeek(getCurrentWeek());
  // }, []);

  return (
    <>
      <div className="card shadow border-0 mx-4">
        <div className="container">
          <div className="row my-3 d-flex justify-content-between">
            <div className="col-md-5 col-12">
              <div className="row mb-3">
                <div className="col-12 pe-0 me-0">
                  <p className="mt-1 text-nowrap">Referrer Id :{" "}{referrerCode}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="row mb-3">
                <div className="col-1">
                <label className="mt-1">Month</label>
                </div>
                <div className="col-11">
                <input
                  type="month"
                  className="form-control week-input ms-6"
                  style={{ boxShadow: "none", width: "170px", height: "40px" }}
                  value={currentMonth}
                  onChange={(e) => handleMonthChange(e)}
                  max={new Date().toISOString().slice(0, 7)}
                />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12 text-md-end">
              <div className="row">
                <div className="col-12">
                  <p className="mt-1">Hello {referrerName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {/* <div className="row d-flex justify-content-between">
              <div className="col"></div>
              <div className="col d-flex justify-content-md-end">
                <label className="mt-3">Month</label>
                <input
                  type="month"
                  className="form-control week-input ms-5"
                  style={{ boxShadow: "none", width: "200px" }}
                  value={currentMonth}
                  onChange={(e) => handleMonthChange(e)}
                  max={new Date().toISOString().slice(0, 7)}
                />
              </div>
            </div> */}
            <div className="col-12 mt-3">
              <Chart
                options={selectedMonthChart.options}
                series={selectedMonthChart.series}
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
              <b>
                ₹{" "}
                {Number(
                  dashboardData?.total_data?.this_month_earnings ?? 0
                ).toLocaleString("en-IN")}
              </b>
            </div>
            <div className="col-md-3 col-12">
              <p>Total Earnings</p>
              <b>
                ₹{" "}
                {Number(
                  dashboardData?.total_data?.total_earnings ?? 0
                ).toLocaleString("en-IN")}
              </b>
            </div>
            <div className="col-md-4 col-12">
              <p>This Month Referrals</p>
              <b>{dashboardData?.total_data?.this_month_referrals ?? 0}</b>
            </div>
            <div className="col-md-2 col-12">
              <p>Total Referrals</p>
              <b>{dashboardData?.total_data?.total_referrals ?? 0}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="card shadow border-0 mt-3 p-5">
              <h5 className="mb-3" style={{ fontWeight: 500 }}>
                Referral Vendor Count (Last 6 Months)
              </h5>
              <table class="table table-bordered mx-2">
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Vendors</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.total_data?.total_count_month &&
                    dashboardData?.total_data?.total_count_month.map(
                      (data, index) => {
                        return (
                          <tr key={index}>
                            <td>{formatMonth(data.month)}</td>
                            <td>{data.count}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card shadow border-0 mt-3 p-5">
              <div className="row d-flex justify-content-between mb-4">
                <div className="col">
                  <h4 style={{ visibility: "hidden" }}>Referrals</h4>
                </div>
              </div>
              <div className="col-12">
                <Chart
                  options={lastSixMonthChart.options}
                  series={lastSixMonthChart.series}
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
