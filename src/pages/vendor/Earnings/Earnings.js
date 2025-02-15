import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";

const Earnings = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const referrerName = localStorage.getItem("name");
  const referrerCode = localStorage.getItem("referrer_code");
  const [type, setType] = useState("month");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handelMonthSearch = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get(
        `vendor/referrer/commission?month=${month}`
      );
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
    initializeDataTable();
  };

  const handleRangeSearch = async (e) => {
    e.preventDefault();
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get(
        `vendor/referrer/commission?start_date=${startDate}&end_date=${endDate}`
      );
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
    initializeDataTable();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `vendor/referrer/commission?month=${month}`
      );
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
    initializeDataTable();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatIndianCurrency = (num) => {
    if (!num) return "0";
    return Number(num).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  };

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-12 p-2 d-flex justify-content-start align-items-center">
              <h5 class="mb-0 ls-tight no-wrap">
                Referrer Id : {referrerCode}
              </h5>
            </div>
            <div className="col-md-8 col-12 p-2 d-flex justify-content-end align-items-center">
              <h5 class="mb-0 ls-tight">Hello {referrerName}</h5>
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
          <>
            <div className="d-flex gap-3 mt-3 align-items-end">
              <span>
                <label>Type</label>

                <select
                  id="type"
                  name="type"
                  className="form-select form-select-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="month">Month</option>
                  <option value="range">Range</option>
                </select>
              </span>

              {type === "month" && (
                <>
                  <span>
                    <label>Month</label>
                    <input
                      type="month"
                      className="form-control form-control-sm"
                      id="month"
                      name="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </span>
                  <span>
                    <button
                      type="button"
                      onClick={handelMonthSearch}
                      className="btn btn-primary btn-sm"
                    >
                      Search
                    </button>
                  </span>
                </>
              )}

              {type === "range" && (
                <form
                  className="d-flex gap-3 align-items-end"
                  onSubmit={handleRangeSearch}
                >
                  <span>
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="start_date"
                      name="start_date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </span>
                  <span>
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="end_date"
                      name="end_date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </span>
                  <span>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Search
                    </button>
                  </span>
                </form>
              )}
            </div>

            <div className="table-responsive px-2">
              <table
                ref={tableRef}
                className="display table nowrap"
                style={{ width: "100%" }}
              >
                <thead className="thead-light">
                  <tr>
                    <th
                      className="text-center"
                      scope="col"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      S.NO
                    </th>
                    <th className="text-start">Vendor Name</th>
                    <th className="text-start">Amount</th>
                    <th className="text-start">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((data, index) => {
                    return (
                      <tr key={data.id}>
                        <td className="text-center align-middle">
                          {index + 1}
                        </td>
                        <td className="align-middle text-start">
                          {data?.vendor_name}
                        </td>
                        <td className="align-middle text-start">
                          ₹{formatIndianCurrency(data?.amount)}
                        </td>
                        <td className="align-middle text-start">
                          ₹{formatIndianCurrency(data?.commission_rate)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between p-2 mb-3 bg-light ">
              <h5>
                Total Amount:{" "}
                <span className="text-primary">
                  ₹
                  {formatIndianCurrency(
                    datas.reduce(
                      (acc, curr) => acc + (Number(curr.amount) || 0),
                      0
                    )
                  )}
                </span>
              </h5>
              <h5>
                Total Commission:{" "}
                <span className="text-success">
                  ₹
                  {formatIndianCurrency(
                    datas.reduce(
                      (acc, curr) => acc + (Number(curr.commission_rate) || 0),
                      0
                    )
                  )}
                </span>
              </h5>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Earnings;
