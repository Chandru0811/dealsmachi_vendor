import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function Payments() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`admin/shop/${id}/payment`);
                setData(response.data.data);
            } catch (error) {
                toast.error("Error Fetching Data ", error);
            }
        };
        getData();
    }, [id]);
    return (
        <div className="container-fluid ">
            <div className="container">
                <div className="row mt-5 p-3">
                    <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>PayPal</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data?.payment_id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Account Holder</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data.account_holder}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Account Type</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data.account_type}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Account Number</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: {data.account_number}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row mb-3">
                            <div className="col-3 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Bank Name</b>
                                </p>
                            </div>
                            <div className="col-9">
                                <p className="text-muted text-sm">: {data.bank_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row mb-3">
                            <div className="col-3 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Bank Address</b>
                                </p>
                            </div>
                            <div className="col-9">
                                <p className="text-muted text-sm">: {data.bank_address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row mb-3">
                            <div className="col-3 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Bank Code</b>
                                </p>
                            </div>
                            <div className="col-9">
                                <p className="text-muted text-sm">: {data.bank_code}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payments;
