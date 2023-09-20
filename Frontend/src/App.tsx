// Libraries
import React from "react";
import { BrowserRouter } from "react-router-dom";
// Components
import { AutoRoutes } from "./routes";

import "./styles";
import { ToastContainer, ToastPosition } from "react-toastify";

export const App = () => {
  const toastProps = {
    position: 'top-right' as ToastPosition,
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <AutoRoutes />
        <ToastContainer {...toastProps} />
      </BrowserRouter>
    </div>
  );
};
