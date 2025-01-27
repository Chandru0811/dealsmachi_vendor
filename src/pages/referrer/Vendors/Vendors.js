import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { PiPlusSquareFill } from "react-icons/pi";

const Vendors = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const datas = [
    {
      id: 1,
      vendorId: 1,
      vendorName: "Suriya",
      dateOfJoining: "01-02-2025",
    },
    {
      id: 2,
      vendorId: 2,
      vendorName: "Chandru",
      dateOfJoining: "03-02-2025",
    },
  ];

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-2 d-flex justify-content-between align-items-center">
              <h3 class="mb-0 ls-tight">Vendors</h3>
              <div class="container-fluid d-flex justify-content-end">
                <Link to="/vendors/add">
                  <button
                    type="submit"
                    className="btn btn-sm btn-button shadow-none border-0 py-3"
                  >
                    <PiPlusSquareFill size={20} />
                    Add Vendors
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
                  <th className="text-start">Vendor Id</th>
                  <th className="text-start">Vendor Name</th>
                  <th className="text-start">Date of Joining</th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => {
                  return (
                    <tr key={data.id}>
                      <td className="text-start align-middle">{index + 1}</td>
                      <td className="align-middle text-start">
                        {data?.vendorId}
                      </td>
                      <td className="align-middle text-start">
                        {data?.vendorName}
                      </td>
                      <td className="align-middle text-start">
                        {data?.dateOfJoining}
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

export default Vendors;
