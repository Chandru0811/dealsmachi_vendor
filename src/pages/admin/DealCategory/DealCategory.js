import React, { useEffect, useRef, useState } from 'react';
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import cat2 from "../../../assets/category4.png";
import cat3 from "../../../assets/category8.png";
import DeleteModel from '../../../components/admin/DeleteModel';
import { PiPlusSquareFill } from "react-icons/pi";
import api from "../../../config/URL";
import Image from "../../../assets/tv.png";
import ImageURL from '../../../config/ImageURL';

function DealCategory() {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log("first", datas);
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
            const response = await api.get('/admin/dealCategory');
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
                // Initial data fetch with pagination
                const response = await api.get('/admin/dealCategory');
                setDatas(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
            initializeDataTable(); // Initialize DataTable with fetched data
        };

        fetchData();
        refreshData();

        return () => {
            destroyDataTable(); // Cleanup DataTable on component unmount
        };
    }, []);

    return (
        <section className="px-4">
            <div className="card shadow border-0 mb-2 top-header p-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-2 d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Deal Category</h3>
                            <Link to="/dealcategories/add">
                                <button className="btn btn-sm btn-button shadow-none border-0">
                                    <PiPlusSquareFill size={20} /> Add Deal Category
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container card shadow border-0" style={{ minHeight: "80vh" }}>
                {loading ? (
                    <div className="loader-container">
                        <div class="loading">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
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
                                    <th scope="col">Slug</th>
                                    <th scope="col" className='text-start'>Description</th>
                                    {/* <th scope="col">Active</th> */}
                                    <th scope="col" className="text-center">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas?.map((data, index) => (
                                    <tr key={data.id}>
                                        <td className="text-start align-middle">{index + 1}</td>
                                        <td
                                            className="ms-2"><img src={`${ImageURL}${data.image_path}`}
                                                alt="icon"

                                                width={50}
                                                className="img-fluid"></img>{data.name}
                                        </td>
                                        <td className="align-middle">{data.slug}</td>
                                        <td className="align-middle text-start">{data.description}</td>
                                        {/* <td className="text-center">
                                            <div className="word-wrap">
                                                {data.active == 1 ? (
                                                    <span className="dot" style={{ backgroundColor: 'green', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                                                ) : (
                                                    <span className="dot" style={{ backgroundColor: 'red', width: '10px', height: '10px', display: 'inline-block', borderRadius: '50%' }}></span>
                                                )}
                                                {data.active ? ' Active' : ' Inactive'}
                                            </div>
                                        </td> */}



                                        <td className="align-middle text-center">
                                            <Link to={`/dealcategories/view/${data.id}`}>
                                                <button className="button-btn btn-sm m-2">View</button>
                                            </Link>
                                            <Link to={`/dealcategories/edit/${data.id}`}>
                                                <button className="button-btn btn-sm m-2">Edit</button>
                                            </Link>
                                            <DeleteModel
                                                onSuccess={refreshData}
                                                path={`admin/dealCategory/remove/${data.id}`}
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

export default DealCategory;