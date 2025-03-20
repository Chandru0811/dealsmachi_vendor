import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const SubCategoriesIndex = () => {
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return; // DataTable already initialized
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
    destroyDataTable(); // Clean up the old DataTable
    setLoading(true);
    try {
      // Fetch paginated data; adjust URL parameters if server supports pagination
      const response = await api.get("admin/subcategories");
      setDatas(response.data.data); // Update data state
      console.log("first:", response.data.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
    initializeDataTable(); // Reinitialize DataTable after data update
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get("admin/subcategories");
        setDatas(response.data.data);

        // Initialize DataTable
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-2 top-header p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-2 d-flex justify-content-between align-items-center">
              <h3 class="mb-0 ls-tight text-nowrap">Sub Categories</h3>
              <div class="container-fluid d-flex justify-content-end">
                <Link to="/subcategories/add">
                  <button
                    type="submit"
                    className="btn btn-sm btn-button shadow-none border-0 py-3"
                  >
                    <PiPlusSquareFill size={20} />
                    Add category
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
              className="display table"
              style={{ width: "100%" }}
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  {/* <th scope="col">Category Group Id</th> */}
                  <th scope="col">Name</th>
                  {/* <th scope="col">Slug</th> */}
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.category_id}>
                    <td className="text-center">{index + 1}</td>
                    {/* <td>
                    <div className="word-wrap text-center">
                      {data.category_id}
                    </div>
                  </td> */}
                    <td className="text-start">
                      <img
                        src={`${ImageURL}${data.path}`}
                        alt="Logo"
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "70px", maxWidth: "70px" }}
                      />
                      {data.name}
                    </td>
                    {/* <td>
                      <div className="word-wrap">{data.slug}</div>
                    </td> */}
                    <td>
                      <p className=" text-wrap">{data.description}</p>
                    </td>
                    <td className="align-middle">
                      {data.active === "0" ? (
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
                      ) : (
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
                      )}
                      {data.active ? " Active" : " Inactive"}
                    </td>

                    <td className="text-center">
                      <div>
                        <Link to={`/subcategories/view/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            View
                          </button>
                        </Link>
                        <Link to={`/subcategories/edit/${data.id}`}>
                          <button className="button-btn btn-sm m-2">
                            Edit
                          </button>
                        </Link>
                        <DeleteModel
                          onSuccess={refreshData}
                          path={`admin/subcategory/${data.id}`}
                          style={{ display: "inline-block" }}
                        />
                      </div>
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

export default SubCategoriesIndex;
