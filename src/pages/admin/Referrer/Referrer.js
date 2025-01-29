import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { PiPlusSquareFill } from "react-icons/pi";

const Referrer = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const datas = [
    {
      id: 1,
      referrer_id: "1",
      referrer_name: "Suriya",
      vendor_name: "Chandru",
      amount: "1000",
      date: "Jan 2025",
    },
    {
      id: 2,
      referrer_id: "1",
      referrer_name: "Suriya",
      vendor_name: "Chandru",
      amount: "1000",
      date: "Jan 2025",
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
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0 ls-tight">Referrer</h3>
                <div className="container-fluid d-flex justify-content-end">
                  <Link to="/referrer/add">
                    <button className="btn btn-sm btn-button shadow-none border-none py-3">
                      <PiPlusSquareFill size={20} /> Add Referrer
                    </button>
                  </Link>
                </div>
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
                  <th className="text-start">Referrer ID</th>
                  <th className="text-start">Referrer Name</th>
                  <th className="text-start">vendor Name</th>
                  <th className="text-start">Date</th>
                  <th className="text-start">Amount</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className="text-start align-middle">{index + 1}</td>
                    <td className="text-start">{data?.referrer_id}</td>
                    <td className="align-middle text-start">
                      {data?.referrer_name}
                    </td>
                    <td className="align-middle text-start">
                      {data?.vendor_name}
                    </td>
                    <td className="align-middle text-start">{data?.date}</td>
                    <td className="align-middle text-start">{data?.amount}</td>
                    <td className="align-middle text-center">
                      <Link to={`/referrer/edit`}>
                        <button className="button-btn btn-sm m-2">Edit</button>
                      </Link>
                      {/* <Link to={`/referrer/view`}>
                        <button className="button-btn btn-sm m-2">View</button>
                      </Link> */}
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

export default Referrer;
