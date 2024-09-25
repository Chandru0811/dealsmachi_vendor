import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategoryView() {
    return (
        <div className="container-fluid ">
            <div className="card shadow border-0 mb-2 top-header ">
                <div className="container-fluid py-4">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="d-flex align-items-center gap-4">
                                <h1 className="h4 ls-tight headingColor">View Product</h1>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="hstack gap-2 justify-content-start">
                                <Link to="/category">
                                    <button type="submit" className="btn btn-sm btn-light ">
                                        <span>Back</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
                <div className="container">
                    <div className="row mt-5 p-3">
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Category Group Id</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: 1</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Name</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: Vivo</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Slug</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: vivo</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row mb-3">
                                <div className="col-6 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Active</b>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted text-sm">: In active</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-3 d-flex justify-content-start align-items-center">
                                    <p className="text-sm">
                                        <b>Description</b>
                                    </p>
                                </div>
                                <div className="col-9">
                                    <p className="text-muted text-sm">: Test</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryView;
