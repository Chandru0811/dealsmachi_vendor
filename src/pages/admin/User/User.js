import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const User = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await api.get("/admin/users");
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
        const response = await api.get("admin/users");
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
                <h3 className="mb-0 ls-tight">Users</h3>
                <div className="container-fluid d-flex justify-content-end">
                  {/* <Link to="/slider/add">
                    <button className="btn btn-sm btn-button shadow-none border-none py-3">
                      <PiPlusSquareFill size={20} /> Add Slider
                    </button>
                  </Link> */}
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
                  <th
                    scope="col"
                    className="text-center"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    S.NO
                  </th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  {/* <th className="text-center">ACTION</th> */}
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{data.name}</td>
                    <td className="text-center ms-2">{data.email}</td>
                    {/* <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Link to={`/user/view/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            View
                          </button>
                        </Link>
                        <Link to={`/slider/edit/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`/admin/slider/delete/${data.id}`}
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </td> */}
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

export default User;
