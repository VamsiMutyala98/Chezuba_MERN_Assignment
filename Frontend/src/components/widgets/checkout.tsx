import React, { FC, ReactElement } from "react";
import { toast } from "react-toastify";
import { ConnectedProps, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateOrderDetailsById } from "../../store/actions/base.action";
import { IRootState } from "../../store/types/base.type";
import { EOrderStatus } from "../../types/order.type";

interface IProps extends PropsFromRedux {
  orderId: string;
  totalCount: number;
}

const Checkout: FC<IProps> = ({ ...props }): ReactElement => {
  const [tax] = React.useState<number>(5);
  const [deliveryCharges] = React.useState<number>(50);
  const [promoCodes] = React.useState<{ label: string; value: number }[]>([
    {
      label: "SAVE 5",
      value: 5,
    },
    {
      label: "WELCOME PROMO",
      value: 10,
    },
  ]);
  const [promoCodeValue, setPromoCodeValue] = React.useState<string>("");
  const [promoCodeDiscount, setPromoCodeDiscount] = React.useState<number>(0);
  const navigate = useNavigate();

  const applyPromcode = () => {
    const findIndex = promoCodes.findIndex((pCodes) => pCodes.label === promoCodeValue);
    if (findIndex > -1) {
      setPromoCodeDiscount(promoCodes[findIndex].value);
      toast.success("Promo code applied succeefully", { theme: "colored" });
    } else {
      toast.warning("No Promo codes", { theme: "colored" });
    }
  };
  return (
    <div className="col-xs-8 col-sm-12 col-md-12 col-lg-12 col-xl-12 checkout__wrap">
      <div className="row">
        <span className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 checkout__promocode__wrap">
          <input
            className="form-control"
            type="text"
            placeholder="Promo Code"
            value={promoCodeValue}
            onChange={($event) => setPromoCodeValue($event.target.value)}
          />
          <button type="button" className="checkout__apply__btn" onClick={() => applyPromcode()}>
            Apply
          </button>
        </span>
      </div>
      <div className="row checkout__group">
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__label">Cart total:</span>
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__price">₹ {props.totalCount}</span>
      </div>
      <div className="row checkout__group">
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__label">Tax</span>
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__price">{tax}%</span>
      </div>
      <div className="row checkout__group">
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__label">Delivery</span>
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__price">₹ {deliveryCharges}</span>
      </div>
      <div className="row checkout__group">
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__label">Promo discount</span>
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__price">{promoCodeDiscount}%</span>
      </div>
      <hr />
      <div className="row checkout__group">
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__label">Sub Total</span>
        <span className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 checkout__price">
          ₹{" "}
          {props.totalCount +
            deliveryCharges -
            ((props.totalCount + deliveryCharges) / 100) * (tax + promoCodeDiscount)}
        </span>
      </div>
      <div className="row checkout__group">
        <span className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 checkout__button">
          <button
            type="button"
            onClick={() => {
              props.updateOrderDetailsById(props.orderId, EOrderStatus.CREATED);
              navigate("/checkout-page");
            }}
          >
            Proceed to checkout
          </button>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  orderDetails: state.root.orderDetails,
});

const mapDispatchToProps = { updateOrderDetailsById };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Checkout);
