import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";
import DeleteModel from '../../../components/admin/DeleteModel';
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

const Shop = () => {
    const tableRef = useRef(null);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get('/admin/shops');
                setDatas(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            initializeDataTable();
        }
        return () => {
            destroyDataTable();
        };
    }, [loading]);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            // DataTable already initialized, no need to initialize again
            return;
        }
        $(tableRef.current).DataTable({
            responsive: true,
            columnDefs: [{ orderable: false, targets: -1 }],
        });
    };

    const destroyDataTable = () => {
        const table = $(tableRef.current).DataTable();
        if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
            table.destroy();
        }
    };

    return (
        <section className="px-4">
            <div className="card shadow border-0 mb-2 py-3 top-header">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">Shop</h3>
                            </div>
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
                    <div className="table-responsive p-2" >
                        <table
                            ref={tableRef}
                            className="display table nowrap"
                            style={{ width: "100%" }}
                        >
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" style={{ whiteSpace: "nowrap" }}>S.NO</th>
                                    <th className="text-center">Logo</th>
                                    <th className="text-center">Store Name</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length > 0 ? (
                                    datas.map((data, index) => (
                                        <tr key={data.id}> {/* Unique key prop */}
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <img
                                                    src={`${ImageURL}${data.logo}`}
                                                    alt=""
                                                    className="img-fluid"
                                                    width={50}
                                                />
                                            </td>
                                            <td className="text-center">{data.name}</td>
                                            <td className="text-center">{data.email}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center">
                                                    <Link to={`/shop/view/${data.id}`}>
                                                        <button className="button-btn btn-sm m-2">View</button>
                                                    </Link>
                                                    {/* <DeleteModel id={data.id} /> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shop;
