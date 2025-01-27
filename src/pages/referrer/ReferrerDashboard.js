import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";
import dashboardcard1 from "../../assets/dashboard card1.webp";
import dashboardcard2 from "../../assets/dashboard card2.webp";
import dashboardcard3 from "../../assets/dashboard card3.webp";
import dashboardcard4 from "../../assets/dashboard card4.webp";
import dashboardcard5 from "../../assets/dashboard card5.webp";

function ReferrerDashboard() {
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
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        labels: {
          style: {
            fontFamily: "Kanit, sans-serif",
          },
        },
      },
      yaxis: {
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
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([
    { name: "Laptop", selected: true },
    { name: "Mobile", selected: true },
    { name: "TV", selected: true },
    { name: "Product 4", selected: true },
    { name: "Product 5", selected: true },
    { name: "Product 6", selected: true },
    { name: "Product 7", selected: true },
    { name: "Product 8", selected: true },
    { name: "Product 9", selected: true },
  ]);
  const [selectAll, setSelectAll] = useState(true);

  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts(
      products.map((product) => ({ ...product, selected: newSelectAll }))
    );
  };

  const handleProductSelect = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].selected = !updatedProducts[index].selected;
    setProducts(updatedProducts);

    const allSelected = updatedProducts.every((product) => product.selected);
    setSelectAll(allSelected);
  };
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
      </div>
      <div className="row mt-4">
        <input
          type="week"
          className="form-control week-input  ms-5"
          style={{ boxShadow: "none", width: "250px" }}
          value={currentWeek}
          onChange={(e) => setCurrentWeek(e.target.value)}
        />
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
      <div className="row d-flex align-items-center mt-4">
        <div className="col-md-6 col-12">
          <table class="table table-bordered mx-2">
            <thead>
              <tr>
                <th scope="col">S No</th>
                <th scope="col">Month</th>
                <th scope="col">Vendors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>January</td>
                <td>15</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Febraury</td>
                <td>25</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>March</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-12">
          <input
            type="week"
            className="form-control week-input  ms-5"
            style={{ boxShadow: "none", width: "250px" }}
            value={currentWeek}
            onChange={(e) => setCurrentWeek(e.target.value)}
          />
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
  );
}

export default ReferrerDashboard;
