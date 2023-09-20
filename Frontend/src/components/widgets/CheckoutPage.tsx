import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="row d-flex justify-content-center">
      <h1 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ textAlign: "center" }}>
        Order Placed Successfully
      </h1>
      <button
        className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-5 checkout__home_button"
        type="button"
        style={{ width: "200px" }}
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faBackward} />
        Go to home
      </button>
    </div>
  );
};

export default CheckoutPage;
