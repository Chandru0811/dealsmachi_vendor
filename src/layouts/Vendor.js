import React from "react";
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

function Vendor({ handleLogout }) {
  return (
    <div>
      <BrowserRouter basename="/dealslahVendor">
        <ApprovePopup />
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
          <VendorSidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-auto">
            <VendorHeader />
            <main className="pt-3 bg-surface-secondary">
              <ScrollToTop />
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<DashboardV />} />
                  <Route path="*" element={<DashboardV />} />

                  {/* {/ Slider /} */}
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/add" element={<ProductAdd />} />
                  <Route path="/product/edit/:id" element={<ProductEdit />} />
                  <Route path="/product/view/:id" element={<ProductView />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/product/view" element={<StorePolicy />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/categorys/add" element={<CategoryAdd />} />
                  <Route path="/categorys/edit" element={<CategoryEdit />} />
                  <Route path="/categorys/view" element={<CategoryView />} />
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
