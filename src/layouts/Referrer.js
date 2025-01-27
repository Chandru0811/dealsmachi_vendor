import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/adminCDN.css";
import "../styles/admin.css";
import "../styles/Vendor.css";
import ReferrerSidebar from "../components/referrer/ReferrerSidebar";
import ReferrerHeader from "../components/referrer/ReferrerHeader";
import ScrollToTop from "../pages/ScrollToTop";
import AdminFooter from "../components/admin/AdminFooter";
import ReferrerDashboard from "../pages/referrer/ReferrerDashboard";
import Vendors from "../pages/referrer/Vendors/Vendors";
import VendorsAdd from "../pages/referrer/Vendors/VendorsAdd";

function Vendor({ handleLogout }) {
  return (
    <div>
      <BrowserRouter basename="/dealsmachiVendor">
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary">
          <ReferrerSidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-auto">
            <ReferrerHeader />
            <main className="pt-3" style={{ backgroundColor: "#f2f2f2" }}>
              <ScrollToTop />
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<ReferrerDashboard />} />
                  <Route path="*" element={<ReferrerDashboard />} />

                  {/* My Vendor  */}
                  <Route path="/vendors" element={<Vendors />} />
                  <Route path="/vendors/add" element={<VendorsAdd />} />

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
