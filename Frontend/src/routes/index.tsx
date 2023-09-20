import React, { FC, ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../components/auth/login/Loadable";
import { SignUp } from "../components/auth/signup/Loadable";
import { Home } from "../components/home/Loadable";
import RequiredAuth from "../components/auth/RequiredAuth";
import Layout from "../components/layout";
import CartItemsLayout from "../components/cartItemsLayout";
import CheckoutPage from "../components/widgets/CheckoutPage";
import Settings from "../components/widgets/Settings";

export const AutoRoutes: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/">
        <Route
          path=""
          element={
            <RequiredAuth>
              <Layout>
                <Home />
              </Layout>
            </RequiredAuth>
          }
        />
        <Route
          path="cart-items"
          element={
            <RequiredAuth>
              <Layout>
                <CartItemsLayout />
              </Layout>
            </RequiredAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequiredAuth>
              <Layout>
                <Settings />
              </Layout>
            </RequiredAuth>
          }
        />
        <Route
          path="checkout-page"
          element={
            <RequiredAuth>
              <Layout>
                <CheckoutPage />
              </Layout>
            </RequiredAuth>
          }
        />
      </Route>
    </Routes>
  );
};
