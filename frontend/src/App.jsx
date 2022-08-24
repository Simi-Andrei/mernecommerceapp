import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

const App = () => {
  return (
    <div className="flex flex-col justify-between bg-stone-50">
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto flex-1 min-h-screen">
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/store/search/:keyword" element={<StorePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/store/product/:id" element={<ProductPage />} />
              <Route path="/cart">
                <Route path=":id" element={<CartPage />} />
                <Route path="" element={<CartPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/admin/userlist" element={<UserListPage />} />
              <Route path="/admin/productlist" element={<ProductListPage />} />
              <Route path="/admin/orderlist" element={<OrderListPage />} />
              <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditPage />}
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
