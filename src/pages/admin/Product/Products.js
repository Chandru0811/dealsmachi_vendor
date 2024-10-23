import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
// import DeleteModel from "../../../components/admin/DeleteModel";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const Products = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return; // DataTable already initialized
    }
    $(tableRef.current).DataTable({
      destroy: true, // Ensure table is destroyed before reinitializing
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().clear().destroy(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get("/admin/products");
        setDatas(response.data.data);

        if (tableRef.current) {
          initializeDataTable(); // Initialize DataTable after data is set
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      destroyDataTable(); // Clean up DataTable on component unmount
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
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>S.NO</th>
                  <th className="text-start">Title</th>
                  <th className="text-start">Orginal Price</th>
                  <th className="text-start">Company Name</th>
                  <th className="text-start">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className="text-start align-middle">{index + 1}</td>
                    <td className="text-start">
                      <img
                        src={`${ImageURL}${data.image_url1}`}
                        alt="Logo"
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "70px", maxWidth: "70px" }}
                      />
                      {data.name}
                    </td>
                    <td className="align-middle text-start">
                      {data.original_price}
                    </td>
                    <td className="align-middle text-start">{data.shopName}</td>
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
                      <Link to={`/products/view/${data.id}`}>
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

export default Products;
