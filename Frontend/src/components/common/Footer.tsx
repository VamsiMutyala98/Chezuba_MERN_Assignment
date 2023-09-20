import React, { FC, ReactElement } from "react";

const Footer: FC = (): ReactElement => {
  return (
    <div className="row footer">
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">© 2023 Star Bakery - All Rights Reserved.</div>
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" />
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-end">Privacy Policy</div>
    </div>
  );
};

export default Footer;
