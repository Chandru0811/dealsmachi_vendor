import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/admin/DeleteModel";
import api from "../../../config/URL";
import { MdAddBox } from "react-icons/md";

const Product = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id = localStorage.getItem("shop_id");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
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
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get(`vendor/product/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
    initializeDataTable();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <MdAddBox size={20} /> Add Deal
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
                  <th className="text-center">Status</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-start">
                      {/* <img
                        src={`${ImageURL}${data.image_url1}`}
                        alt="Logo"
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "50px", maxWidth: "50px" }}
                      /> */}
                      {data.name}
                    </td>
                    <td className="text-center">{data.brand}</td>
                    <td className="align-middle">
                      {data.active === 1 ? (
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
                      {data.active === 0 ? " Inactive" : "Active "}
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
