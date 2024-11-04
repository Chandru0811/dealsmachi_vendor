import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import noImage from "../../../assets/noimage.png";

const Shop = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/admin/shops");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 py-3 top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 ls-tight">Company</h3>
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

                  <th className="text-start">Store Name</th>
                  <th className="text-start">Email</th>
                  <th className="text-start">Status</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((data, index) => (
                    <tr key={data.id}>
                      {" "}
                      {/* Unique key prop */}
                      <td className="text-center">{index + 1}</td>
                      <td className="text-start">
                        <img
                          src={
                            data.logo !== null
                              ? `${ImageURL}${data.logo}`
                              : noImage
                          }
                          alt=""
                          className="img-fluid"
                          width={50}
                        />
                        {data.name}
                      </td>
                      {/* <td className="text-center">{data.name}</td> */}
                      <td className="text-start">{data.email}</td>
                      <td className="align-middle">
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
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Link to={`/shop/view/${data.id}`}>
                            <button className="button-btn btn-sm m-2">
                              View
                            </button>
                          </Link>
                          {/* <DeleteModel id={data.id} /> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
