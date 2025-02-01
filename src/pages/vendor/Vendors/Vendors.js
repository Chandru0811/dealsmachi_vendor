import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";

const Vendors = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const referrerName = localStorage.getItem("name");
  const referrerCode = localStorage.getItem("referrer_code");
  const referrerId = localStorage.getItem("id");
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get(`vendor/referrals/${referrerId}`);
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
        const response = await api.get(`vendor/referrals/${referrerId}`);
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
                        {data?.id}
                      </td>
                      <td className="align-middle text-start">{data?.name}</td>
                      <td className="align-middle text-start">
                        {data?.created_at?.substring(0, 10)}
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
