import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiIntersectSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

const Product = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id = sessionStorage.getItem("shop_id");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return; // DataTable already initialized
    }
    $(tableRef.current).DataTable({
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };
  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable(); // Clean up the old DataTable
    setLoading(true);
    try {
      // Fetch paginated data; adjust URL parameters if server supports pagination
      const response = await api.get(`vendor/product/${id}`);
      setData(response.data.data); // Update data state
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
    initializeDataTable(); // Reinitialize DataTable after data update
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Initial data fetch with pagination
        const response = await api.get(`vendor/product/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
      initializeDataTable();
    };

    fetchData();
    refreshData();

    return () => {
      destroyDataTable();
      fetchData();
    };
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Deals</h3>
                <Link to="/product/add">
                  <button className="btn btn-sm btn-button shadow-none border-none py-3">
                    <PiIntersectSquareFill size={20} /> Add Deal
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container card shadow border-0"
        style={{ minHeight: "80vh" }}
      >
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <div className="table-responsive ">
            <table ref={tableRef} className="display">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Brand</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-start">
                      <img
                        src={`${ImageURL}${data.image_url1}`}
                        alt="Logo"
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "50px", maxWidth: "50px" }}
                      />
                      {data.name}
                    </td>
                    <td className="text-center">{data.brand}</td>
                    <td className="align-middle">
                      {data.active === "1" ? (
                        <span
                          className="dot"
                          style={{
                            backgroundColor: "green",
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            borderRadius: "50%",
                          }}
                        ></span>
                      ) : (
                        <span
                          className="dot"
                          style={{
                            backgroundColor: "red",
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            borderRadius: "50%",
                          }}
                        ></span>
                      )}
                      {data.active === "0" ? " Inactive" : "Active "}
                    </td>
                    <td className="d-flex justify-content-center">
                      <Link to={`/product/view/${data.id}`}>
                        <button className="button-btn btn-sm m-2">View</button>
                      </Link>
                      <Link to={`/product/edit/${data.id}`}>
                        <button className="button-btn btn-sm m-2">Edit</button>
                      </Link>
                      <DeleteModel
                        onSuccess={refreshData}
                        path={`vendor/product/${data.id}/delete`}
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
