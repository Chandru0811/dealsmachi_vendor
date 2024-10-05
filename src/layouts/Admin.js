import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Sidebar from "../components/admin/Sidebar";
import "../styles/adminCDN.css";
import "../styles/admin.css";
import AdminFooter from "../components/admin/AdminFooter";
import CategoryGroups from "../pages/admin/CategoryGroups/CategoryGroups";
import CategoryGroupAdd from "../pages/admin/CategoryGroups/CategoryGroupAdd";
import CategoryGroupEdit from "../pages/admin/CategoryGroups/CategoryGroupEdit";
import CategoryGroupView from "../pages/admin/CategoryGroups/CategoryGroupView";
import Banner from "../pages/admin/Banner/Banner";
import BannerAdd from "../pages/admin/Banner/BannerAdd";
import BannerEdit from "../pages/admin/Banner/BannerEdit";
import BannerView from "../pages/admin/Banner/BannerView";
import Slider from "../pages/admin/Slider/Slider";
import SliderAdd from "../pages/admin/Slider/SliderAdd";
import SliderEdit from "../pages/admin/Slider/SliderEdit";
import SliderView from "../pages/admin/Slider/SliderView";
import CategoriesIndex from "../pages/admin/categories/CategoriesIndex";
import CategoriesAdd from "../pages/admin/categories/CategoriesAdd";
import CategoriesView from "../pages/admin/categories/CategoriesView";
import CategoriesEdits from "../pages/admin/categories/CategoriesEdits";
import AdminHeader from "../components/admin/AdminHeader";
import Products from "../pages/admin/Product/Products";
import ProductsAdd from "../pages/admin/Product/ProductsAdd";
import ProductsEdit from "../pages/admin/Product/ProductsEdit";
import ProductsView from "../pages/admin/Product/ProductsView";
import Shop from "../pages/admin/Shop/Shop";
import ShopView from "../pages/admin/Shop/ShopView";
import Stores from "../pages/admin/Shop/Stores";
import Locations from "../pages/admin/Shop/Locations";
import DealCategory from "../pages/admin/DealCategory/DealCategory";
import DealCategoryAdd from "../pages/admin/DealCategory/DealCategoryAdd";
import DealCategoryEdit from "../pages/admin/DealCategory/DealCategoryEdit";
import DealCategoryView from "../pages/admin/DealCategory/DealCategoryView";
import ScrollToTop from "../pages/ScroolToTop";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter basename="/dealslahVendor">
        <ScrollToTop />
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Sidebar handleLogout={handleLogout} />

          <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <AdminHeader />
            <main className="pt-2" style={{ backgroundColor: "#f2f2f2" }}>
              <div style={{ minHeight: "90vh" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />

                  {/* Category Groups */}
                  <Route path="/categorygroup" element={<CategoryGroups />} />
                  <Route
                    path="/categorygroup/add"
                    element={<CategoryGroupAdd />}
                  />
                  <Route
                    path="/categorygroup/edit/:id"
                    element={<CategoryGroupEdit />}
                  />
                  <Route
                    path="/categorygroup/view/:id"
                    element={<CategoryGroupView />}
                  />

                  {/* Categories */}
                  <Route path="/categories" element={<CategoriesIndex />} />
                  <Route path="/categories/add" element={<CategoriesAdd />} />
                  <Route
                    path="/categories/view/:id"
                    element={<CategoriesView />}
                  />
                  <Route
                    path="/categories/edit/:id"
                    element={<CategoriesEdits />}
                  />

                  {/* {/ Banner /} */}
                  <Route path="/banner" element={<Banner />} />
                  <Route path="/banner/add" element={<BannerAdd />} />
                  <Route path="/banner/edit" element={<BannerEdit />} />
                  <Route path="/banner/view" element={<BannerView />} />

                  <Route path="/dealcategories" element={<DealCategory />} />
                  <Route
                    path="/dealcategories/add"
                    element={<DealCategoryAdd />}
                  />
                  <Route
                    path="/dealcategories/edit/:id"
                    element={<DealCategoryEdit />}
                  />
                  <Route
                    path="/dealcategories/view/:id"
                    element={<DealCategoryView />}
                  />

                  {/* {/ Slider /} */}
                  <Route path="/slider" element={<Slider />} />
                  <Route path="/slider/add" element={<SliderAdd />} />
                  <Route path="/slider/edit/:id" element={<SliderEdit />} />
                  <Route path="/slider/view/:id" element={<SliderView />} />
                  {/* {/ Product /} */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/add" element={<ProductsAdd />} />
                  <Route path="/products/edit" element={<ProductsEdit />} />
                  <Route path="/products/view/:id" element={<ProductsView />} />

                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/view/:id" element={<ShopView />} />
                  <Route path="/stores" element={<Stores />} />
                  <Route path="/locations" element={<Locations />} />
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

export default Admin;
