import React, { useEffect, useRef, useState } from 'react';
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from '../../../components/admin/DeleteModel';
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import ImageURL from '../../../config/ImageURL';
import noImage from '../../../assets/noimage.png'
function CategoryGroups() {
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
      const response = await api.get('/admin/categoryGroup');
      setDatas(response.data.data); // Update data state
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setLoading(false);
    initializeDataTable(); // Reinitialize DataTable after data update
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get("/admin/categoryGroup");
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
              <h3 className="mb-0">Category Groups</h3>
              <Link to="/categorygroup/add">
                <button className="btn btn-sm btn-button shadow-none border-0">
                  <PiPlusSquareFill size={20} /> Add Category Group
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
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
            <table ref={tableRef} className="display table">
              <thead className="thead-light">
                <tr>
                  <th scope="col" className='text-start' style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th scope="col">Name</th>
                  {/* <th scope="col">Slug</th> */}
                  <th scope="col" className='text-start'>Order</th>
                  <th scope="col">Active</th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className="text-start align-middle">{index + 1}</td>
                    <td className="text-start">
                      <img
                        src={data.image_path !== null ? `${ImageURL}${data.image_path}` : noImage}
                        alt=""
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "70px", maxWidth: "70px" }}
                      />
                      {data.name}
                    </td>
                    {/* <td className="align-middle">{data.slug}</td> */}
                    <td className="align-middle text-start">{data.order}</td>
                    <td className="align-middle">
                      {data.active ? (
                        <span className="dot" style={{ backgroundColor: 'green', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                      ) : (
                        <span className="dot" style={{ backgroundColor: 'red', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                      )}
                      {data.active ? ' Active' : ' Inactive'}
                    </td>


                    <td className="align-middle text-center">
                      <Link to={`/categorygroup/view/${data.id}`}>
                        <button className="button-btn btn-sm m-2">View</button>
                      </Link>
                      <Link to={`/categorygroup/edit/${data.id}`}>
                        <button className="button-btn btn-sm m-2">Edit</button>
                      </Link>
                      <DeleteModel
                        onSuccess={refreshData}
                        path={`admin/categoryGroup/${data.id}`}
                        style={{ display: "inline-block" }}
                      />
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
}

export default CategoryGroups;