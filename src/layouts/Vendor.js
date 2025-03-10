import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/adminCDN.css";
import "../styles/admin.css";
import "../styles/Vendor.css";
import AdminFooter from "../components/admin/AdminFooter";
import Product from "../pages/vendor/Product/Product";
import ProductAdd from "../pages/vendor/Product/ProductAdd";
import ProductEdit from "../pages/vendor/Product/ProductEdit";
import ProductView from "../pages/vendor/Product/ProductView";
import DashboardV from "../pages/vendor/DashboardV";
import VendorSidebar from "../components/vendor/VendorSidebar";
import Settings from "../pages/vendor/Settings/Settings";
import StorePolicy from "../pages/vendor/Settings/StorePolicy";
import VendorHeader from "../components/vendor/VendorHeader";
import ApprovePopup from "../components/auth/ApprovePopup";
import Category from "../pages/vendor/Category/Category";
import CategoryAdd from "../pages/vendor/Category/CategoryAdd";
import CategoryEdit from "../pages/vendor/Category/CategoryEdit";
import CategoryView from "../pages/vendor/Category/CategoryView";
import ScrollToTop from "../pages/ScrollToTop";
import ProductPrint from "../pages/vendor/Product/ProductPrint";
import EmailVerifySuccess from "../components/client/EmailVerifySuccess";
import Orders from "../pages/vendor/Order/Orders";
import OrderView from "../pages/vendor/Order/OrderView";
import ReferrerDashboard from "../pages/vendor/ReferrerDashboard";
import Vendors from "../pages/vendor/Vendors/Vendors";
import VendorsAdd from "../pages/vendor/Vendors/VendorsAdd";
import Earnings from "../pages/vendor/Earnings/Earnings";

function Vendor({ handleLogout }) {
  const loginType = localStorage.getItem("type");
  return (
    <div>
      <BrowserRouter basename="/dealsmachiVendor">
        <ApprovePopup />
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
          <VendorSidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-auto">
            <VendorHeader />
            <main className="pt-3" style={{ backgroundColor: "#f2f2f2" }}>
              <ScrollToTop />
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  {/* {/ Slider /} */}
                  {(loginType === "vendor" ||
                    loginType === "referrer-vendor") && (
                    <>
                      <Route path="/" element={<DashboardV />} />
                      <Route path="*" element={<DashboardV />} />
                      <Route path="/product" element={<Product />} />
                      <Route path="/product/add" element={<ProductAdd />} />
                      <Route
                        path="/product/edit/:id"
                        element={<ProductEdit />}
                      />
                      <Route
                        path="/product/view/:id"
                        element={<ProductView />}
                      />
                      <Route
                        path="/product/print/:id"
                        element={<ProductPrint />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/product/view" element={<StorePolicy />} />
                      <Route path="/category" element={<Category />} />
                      <Route path="/categorys/add" element={<CategoryAdd />} />
                      <Route
                        path="/categorys/edit"
                        element={<CategoryEdit />}
                      />
                      <Route
                        path="/categorys/view"
                        element={<CategoryView />}
                      />
                      <Route path="/order" element={<Orders />} />
                      <Route
                        path="/order/view/:order_id/:product_id"
                        element={<OrderView />}
                      />
                    </>
                  )}

                  {(loginType === "referrer" ||
                    loginType === "referrer-vendor") && (
                    <>
                      {/* Referrer Dashboard */}
                      <Route
                        path="/referrer_dashboard"
                        element={<ReferrerDashboard />}
                      />
                      <Route path="*" element={<ReferrerDashboard />} />
                      {/* My Vendors */}
                      <Route path="/my_vendors" element={<Vendors />} />
                      <Route path="/my_vendors/add" element={<VendorsAdd />} />

                      <Route path="/earnings" element={<Earnings />} />
                    </>
                  )}
                  <Route
                    path="/emailverifysuccess"
                    element={<EmailVerifySuccess />}
                  />
                </Routes>
              </div>
              <AdminFooter />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Vendor;
