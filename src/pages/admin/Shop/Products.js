import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import $ from "jquery";
import ImageURL from "../../../config/ImageURL";
import noImage from "../../../assets/noimage.png";

function Products() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const tableRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`admin/shop/${id}/products`);
        setData(response.data.data);
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
      setLoading(false);
    };
    getData();
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [id]);
  
  return (
    <div className="container-fluid ">
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
                <th className="text-start">List of Products</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
                {datas?.map((data, index) => (
                  <tr key={data.id}>
                    <td className=" align-middle">{index + 1}</td>
                    <td className="text-start">
                      <img
                        src={
                          data.image_url1 !== null
                            ? `${ImageURL}${data.logo}`
                            : noImage
                        }
                        alt={data.name}
                        className="img-fluid w-25 me-3"
                        style={{ maxHeight: "70px", maxWidth: "70px" }}
                      />
                      {data.name}
                    </td>
                    <td className="align-middle text-center">
                      <Link to={`/products/view/${data.id}`}>
                        <button className="button-btn btn-sm m-2">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Products;