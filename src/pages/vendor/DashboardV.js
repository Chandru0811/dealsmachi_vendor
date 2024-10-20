import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./../../styles/Vendor.css";
import dashgraph from "../../assets/dashgraph.png";
import dashgraph2 from "../../assets/dashgraph2.png";
import graph5 from "../../assets/graph5.png";
import graph4 from "../../assets/graph4.png";
import graph6 from "../../assets/Graph1.png";
import graph7 from "../../assets/Graph2.png";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Card } from "react-bootstrap";
import toast from "react-hot-toast";
import api from "../../config/URL";

function DashboardV() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [maxWeek, setMaxWeek] = useState("");
  const [data, setData] = useState(null);
  const [state, setState] = useState({
    options: {
      colors: ["#1A2E86", "#237BFF", "#FFB63A", "#eb4034", "#fb8b33"],
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
    series: [],
  });
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
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
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);
  
    const allSelected = updatedProducts.every((product) => product.selected);
    setSelectAll(allSelected);
  };

  const fetchDataForWeek = async (week) => {
    try {
      const response = await api.post("vendor/dashboard", {
        week: week,
      });
      const { series } = response.data;

      // Update chart data
      setState((prevState) => ({
        ...prevState,
        series: series,
      }));
    } catch (error) {
      toast.error("Error Fetching Chart Data");
    }
  };

  useEffect(() => {
    const getCurrentWeek = () => {
      const currentDate = new Date();
      
      currentDate.setHours(0, 0, 0, 0);
    
      const thursday = new Date(currentDate);
      thursday.setDate(currentDate.getDate() + (3 - (currentDate.getDay() + 6) % 7));
    
      const firstThursday = new Date(thursday.getFullYear(), 0, 1);
      firstThursday.setDate(firstThursday.getDate() + (3 - (firstThursday.getDay() + 6) % 7));
    
      const weekNumber = Math.floor((thursday - firstThursday) / (7 * 24 * 60 * 60 * 1000)) + 1;
    
      return `${thursday.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
    };    

    setCurrentWeek(getCurrentWeek());
    setMaxWeek(getCurrentWeek());
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`vendor/dashboard`);
        const { data } = response.data;
        
        // Set initial chart data
        setState((prevState) => ({
          ...prevState,
          series: data.chatdata.series,
        }));

        // Set other data (total clicks, views, products)
        setData(data);
        setProducts(
          data.products.map((product) => ({
            ...product,
            selected: true, // Initially, all products selected
          }))
        );
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };

    getData();
  }, []);

  const handleWeekChange = (e) => {
    const newWeek = e.target.value;
    setCurrentWeek(newWeek);
    fetchDataForWeek(newWeek); // Fetch data for the selected week
  };

  return (
    <div className="card shadow border-0 mx-4" style={{ minHeight: "90vh" }}>
      <div className="row card-container p-5">
      <div className="row card-container p-5">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#1A2E86",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">{data?.totaldealclicks}</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-3">Deal Clicks</p>
              <div className="flex-grow-1">
                <img
                  src={dashgraph}
                  alt=""
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#237BFF",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">{data?.totaldealviews}</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-3">Deal Views</p>
              <img
                src={dashgraph2}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#FFB63A",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">{data?.totaldiscountcopied}</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-4">Discount Copied</p>
              <img
                src={graph5}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#eb4034",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">{data?.totaldealshared}</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-3">Deal Shares</p>
              <div className="pt-5">
                <img
                  src={graph4}
                  alt=""
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#fb8b33",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">{data?.totaldealenquired}</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-3">Deal Enquiries</p>
              <div className="flex-grow-1">
                <img
                  src={graph6}
                  alt=""
                  className="img-fluid"
                  style={{ width: "100%", height: "75px" }}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            style={{
              background: "#52ae55",
              borderRadius: "8px",
            }}
            className="h-100"
          >
            <div className="card-content p-2">
              <div className="d-flex justify-content-between">
                <h2 className="text-white">9.823</h2>
                <div>
                  <IoSettingsOutline className="text-white" />
                  <IoMdArrowDropdown className="text-white" />
                </div>
              </div>
              <p className="text-white mt-3">Members Online</p>
              <div className="flex-grow-1">
                <img
                  src={graph7}
                  alt=""
                  className="img-fluid"
                  style={{ width: "100%", height: "75px" }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      </div>

      <div className="row">
        <input
          type="week"
          className="form-control w-25 ms-5"
          style={{ boxShadow: "none" }}
          value={currentWeek}
          onChange={handleWeekChange} // Call function to fetch data for selected week
          max={maxWeek} // Disable selection for future weeks
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
        <div className="col-12">
          <button
            onClick={toggleShowProducts}
            className="btn m-4"
            style={{ background: "#ff0060", color: "#fff", boxShadow: "none" }}
          >
            {showProducts ? "Hide Products" : "View Products"}
          </button>
          {showProducts && (
            <div className="m-3">
              <div className="mb-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  id="selectAll"
                  disabled
                />
                <label htmlFor="selectAll" className="ms-2 fw-medium">
                  Select All
                </label>
              </div>
              <div className="row">
                {products.map((product, index) => (
                  <div className="col-md-4 mb-2" key={index}>
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => handleProductSelect(index)}
                      id={`product-${index}`}
                      disabled
                    />
                    <label
                      htmlFor={`product-${index}`}
                      className="ms-3 fw-medium"
                    >
                      {product.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardV;