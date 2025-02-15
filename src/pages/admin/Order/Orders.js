import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $, { data } from "jquery";
import { Link } from "react-router-dom";
// import DeleteModel from "../../../components/admin/DeleteModel";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const Orders = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/admin/orders");
      setDatas(response.data.data);
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
        const response = await api.get("/admin/orders");
        setDatas(response.data.data);
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
                  <th className="text-start">Product Name</th>
                  <th className="text-start">Shop Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => {
                 const total = new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                }).format(parseFloat(data.quantity) * parseFloat(data.discount));
                  return (
                    <tr key={data.id}>
                      <td className="text-start align-middle">{index + 1}</td>
                      <td>
                        <div className="d-flex">
                          {data?.item_number}
                          {data?.viewed_by_admin === 1 ? (
                            <div
                              className="active_dot"
                              style={{ marginLeft: "5px" }}
                            ></div>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="align-middle text-start">
                        {data?.order?.customer?.name}
                      </td>
                      <td className="align-middle text-start">{total}</td>
                      <td className="align-middle text-start">
                        {data.item_description}
                      </td>
                      <td className="align-middle text-start">
                        {data?.shop?.legal_name}
                      </td>
                      <td className="align-middle text-center">
                        <Link
                          to={`/order/view/${data.order_id}/${data.product_id}`}
                        >
                          <button className="button-btn btn-sm m-2">
                            View
                          </button>
                        </Link>
                        {/* <DeleteModel /> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
