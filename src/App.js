import Footer from './Components/Utility/Footer';
import { NavBarLogin } from './Components/Utility/NavBarLogin';
import HomePage from './Page/Home/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/Auth/LoginPage';
import RegisterPage from './Page/Auth/RegisterPage';
import AllCategoryPage from './Page/Category/AllCategoryPage';
import AllBrandPage from './Page/Brand/AllBrandPage';
import ShopProductPage from './Page/Products/ShopProductPage';
import ProductDetalisPage from './Page/Products/ProductDetalisPage';
import CartPage from './Page/Cart/CartPage';
import ChoosePayMethoudPage from './Page/Checkout/ChoosePayMethoudPage';
import AdminAllProductPage from './Page/Admin/AdminAllProductPage';
import AdminAllOrderPage from './Page/Admin/AdminAllOrderPage';
import AdminOrderDetailsPage from './Page/Admin/AdminOrderDetailsPage';
import AdminAddBrandPage from './Page/Admin/AdminAddBrandPage';
import AdminAddCategoryPage from './Page/Admin/AdminAddCategoryPage';
import AdminAddSubCategoryPage from './Page/Admin/AdminAddSubCategoryPage';
import AdminAddProductsPage from './Page/Admin/AdminAddProductsPage';
import UserAllOrdersPage from './Page/User/UserAllOrdersPage';
import UserFavoriteProductPage from './Page/User/UserFavoriteProductPage';
import UserAllAddressPage from './Page/User/UserAllAddressPage';
import UserEditAddressPage from './Page/User/UserEditAddressPage';
import UserAddAddressPage from './Page/User/UserAddAddressPage';
import UserProfilePage from './Page/User/UserProfilePage';
import AdminEditProductsPage from './Page/Admin/AdminEditProductsPage';
import ForgetPasswordPage from './Page/Auth/ForgetPasswordPage';
import RsetPasswordPage from './Page/Auth/ResetPasswordPage';
import VerifyPasswordPage from './Page/Auth/VerifyPasswordPage';
import AdminAddCouponPage from './Page/Admin/AdminAddCouponPage';
import AdminEditCouponPage from './Page/Admin/AdminEditCouponPage';
import ProtectedRouteHook from './hook/auth/protected-route-hook';
import ProtectedRoute from './Components/Utility/ProtectedRoute';
import ProductsByBrand from './Page/Products/ProductsByBrand';
import ProductsByCategory from './Page/Products/ProductsByCategory';
import { useEffect } from 'react';
import AdminOrderDetalis from './Components/Admin/AdminOrderDetalis';

function App() {
  const { isUser, isAdmin, loading } = ProtectedRouteHook();

  return (
    <div className="font ">
      <NavBarLogin />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/brand/:id" element={<ProductsByBrand />} />
          <Route
            path="/products/category/:id"
            element={<ProductsByCategory />}
          />
          <Route
            path="/user/forget-password"
            element={<ForgetPasswordPage />}
          />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<RsetPasswordPage />} />
          {/* Admin  */}

          <Route element={<ProtectedRoute auth={isAdmin} loading={loading} />}>
            <Route
              path="/admin/allproducts"
              element={<AdminAllProductPage />}
            />
            <Route path="/admin/allorders" element={<AdminAllOrderPage />} />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route
              path="/admin/addcategory"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/addsubcategory"
              element={<AdminAddSubCategoryPage />}
            />
            <Route
              path="/admin/addproduct"
              element={<AdminAddProductsPage />}
            />{' '}
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProductsPage />}
            />
            <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
            <Route
              path="/admin/editcoupon/:id"
              element={<AdminEditCouponPage />}
            />
          </Route>

          {/* User  */}

          <Route element={<ProtectedRoute auth={isUser} loading={loading} />}>
            <Route path="/user/allOrders" element={<UserAllOrdersPage />} />
            <Route
              path="/user/favorite"
              element={<UserFavoriteProductPage />}
            />
            <Route path="/user/addresses" element={<UserAllAddressPage />} />
            <Route path="/user/add-address" element={<UserAddAddressPage />} />
            <Route
              path="/user/edit-address/:id"
              element={<UserEditAddressPage />}
            />
            <Route path="/user/profile" element={<UserProfilePage />} />

            <Route
              path="/order/paymethoud"
              element={<ChoosePayMethoudPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
