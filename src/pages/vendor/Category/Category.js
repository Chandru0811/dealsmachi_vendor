import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../../components/admin/DeleteModel";
import { PiPlusSquareFill } from "react-icons/pi";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";

const Category = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      destroy: true,
      columnDefs: [{ targets: [0, 3], orderable: false }],
    });

    return () => {
      table.destroy();
    };
  }, []);

  const datas = [
    {
      category_group_id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "All electronic items",
      active: true,
    },
    {
      category_group_id: 2,
      name: "Fashion",
      slug: "fashion",
      description: "Clothing and accessories",
      active: true,
    },
    {
      category_group_id: 3,
      name: "Home Appliances",
      slug: "home-appliances",
      description: "Appliances for home use",
      active: false,
    },
    {
      category_group_id: 4,
      name: "Books",
      slug: "books",
      description: "Collection of books",
      active: true,
    },
    {
      category_group_id: 5,
      name: "Sports",
      slug: "sports",
      description: "Sports equipment and accessories",
      active: true,
    },
  ];

  return (
    <section className="px-4">
      <CategoryAdd />
      <div className="container card shadow border-0">
        <div className="table-responsive minHeight p-2">
          <div className="table-responsive">
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
                  <th scope="col">Slug</th>
                  <th scope="col">Description</th>
                  <th scope="col">Active</th>
                  <th scope="col" className="text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={data.category_group_id}>
                    <td className="text-center">{index + 1}</td>
                    {/* <td>
                    <div className="word-wrap text-center">
                      {data.category_group_id}
                    </div>
                  </td> */}
                    <td>
                      <div className="word-wrap">{data.name}</div>
                    </td>
                    <td>
                      <div className="word-wrap">{data.slug}</div>
                    </td>
                    <td>
                      <div className="word-wrap">{data.description}</div>
                    </td>
                    <td className="text-center">
                      <div className="word-wrap">
                        {data.active ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="text-center d-flex"> 
                        <Link to={`/categorys/view`}>
                          <button className="button-btn btn-sm m-2">
                            View
                          </button>
                        </Link>
                        <CategoryEdit />
                        <DeleteModel /> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
