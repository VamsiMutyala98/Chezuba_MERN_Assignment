import React, { FC, ReactElement } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

interface IProps {
  children: JSX.Element;
}

const Layout: FC<IProps> = ({ children }): ReactElement => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "100px" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
