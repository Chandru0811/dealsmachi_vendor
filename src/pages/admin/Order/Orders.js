import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
// import DeleteModel from "../../../components/admin/DeleteModel";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const Orders = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([
    {
      id: 1,
      order_number: "DEALSLAH_O1",
      name: "Jhon",
      total: 10,
      category: "Category 1",
      active: 1,
    },
    {
      id: 2,
      order_number: "DEALSLAH_O2",
      name: "Doe",
      total: 5,
      category: "Category 2",
      active: 0,
    },
    {
      id: 3,
      order_number: "DEALSLAH_O3",
      name: "Jane",
      total: 8,
      category: "Category 3",
      active: 1,
    },
  ]);
  const [loading, setLoading] = useState(false);

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

  //   const refreshData = async () => {
  //     destroyDataTable();
  //     setLoading(true);
  //     try {
  //       const response = await api.get("/admin/products");
  //       setDatas(response.data.data);
  //     } catch (error) {
  //       console.error("Error refreshing data:", error);
  //     }
  //     setLoading(false);
  //     initializeDataTable();
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await api.get("/admin/products");
  //         setDatas(response.data.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //       setLoading(false);
  //       initializeDataTable();
  //     };
  //     fetchData();
  //     refreshData();

  //     return () => {
  //       destroyDataTable();
  //       fetchData();
  //     };
  //   }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 ls-tight">Orders</h3>
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
          <div className="table-responsive p-2">
            <table
              ref={tableRef}
              className="display table nowrap"
              style={{ width: "100%" }}
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th className="text-start">Order number</th>
                  <th className="text-start">Customer Name</th>
                  <th className="text-start">Total</th>
                  <th className="text-start">Shop Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className="text-start align-middle">{index + 1}</td>
                    <td className="text-start">{data.order_number}</td>
                    <td className="align-middle text-start">{data.name}</td>
                    <td className="align-middle text-start">{data.total}</td>
                    <td className="align-middle text-start">
                      {data.active === 1 ? (
                        <>
                          <span
                            className="dot"
                            style={{
                              backgroundColor: "green",
                              width: "10px",
                              height: "10px",
                              display: "inline-block",
                              borderRadius: "50%",
                              marginRight: "3px",
                            }}
                          ></span>
                          Active
                        </>
                      ) : (
                        <>
                          <span
                            className="dot"
                            style={{
                              backgroundColor: "red",
                              width: "10px",
                              height: "10px",
                              display: "inline-block",
                              borderRadius: "50%",
                              marginRight: "3px",
                            }}
                          ></span>
                          Inactive
                        </>
                      )}
                    </td>
                    <td className="align-middle text-center">
                      <Link to={`/order/view/${data.id}`}>
                        <button className="button-btn btn-sm m-2">View</button>
                      </Link>
                      {/* <DeleteModel /> */}
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

export default Orders;
