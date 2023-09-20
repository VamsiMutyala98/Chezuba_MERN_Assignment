import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../store/types/base.type";
import { setItemsDetails } from "../../store/actions/base.action";
import { IItemDetails } from "../../types/items.type";
import { OrderService } from "../../services/order.service";
import { IOrderDetails, IOrderItemDetails, IOrderPayload } from "../../types/order.type";
import { setOrderDetailsInExistingArray } from "../../store/slice/base.slice";

const orderService = new OrderService();

interface IProps extends PropsFromRedux {
  item: IItemDetails;
}

const Items: FC<IProps> = ({ ...props }): ReactElement => {
  const addItemToCart = async (id: string, type: string) => {
    const branchId: HTMLSelectElement | null = document.getElementById("branch_id") as HTMLSelectElement;
    if (branchId && !branchId.value) {
      branchId.focus();
      toast.warning("Please select branch", { theme: "colored" });
      return;
      // You can safely access branchId.value here
    }

    const data: IOrderPayload = {
      branchId: props?.userDetails?.branchId || "",
      itemId: id,
    };
    const response = await orderService.createOrder(data, type);
    if (response) {
      props.setOrderDetailsInExistingArray(response);
    }
  };

  const countItem = props.orderDetails.reduce((acc: number, cValue: IOrderDetails) => {
    if (cValue?.branchDetails?._id === props?.userDetails?.branchId) {
      return (
        cValue.items.reduce((iAcc: number, iCValue: IOrderItemDetails) => {
          if (iCValue._id === props.item._id) {
            return iCValue.totalItems + iAcc;
          }
          return iAcc;
        }, 0) + acc
      );
    }
    return acc;
  }, 0);

  return (
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 card m-4 item--card">
      <img src={props?.item?.img} className="card-img-top item--card-image" alt={props?.item?.itemName} />
      <div className="card-body">
        <h5 className="card-title">{props?.item?.itemName}</h5>
        <p className="card-text">{`Star Bakery ${props?.item?.itemName}`}</p>
        <h5 className="card-title">₹ {props?.item?.price}</h5>
        <div className="d-flex justify-content-center">
          {!countItem ? (
            <button
              type="button"
              className="item--cart-btn"
              onClick={() => addItemToCart(props?.item?._id || "", "INC")}
            >
              <span>
                <i className="fas fa-cart-shopping" />
                Add to Cart
              </span>
            </button>
          ) : (
            <button type="button" className="item--cart-btn">
              <span className="fw-bold p-3" onClick={() => addItemToCart(props?.item?._id || "", "DEC")}>
                -
              </span>
              &nbsp;&nbsp;
              <span>{countItem}</span>&nbsp;&nbsp;
              <span className="fw-bold p-3" onClick={() => addItemToCart(props?.item?._id || "", "INC")}>
                +
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  items: state.root.items,
  userDetails: state.root.userDetails,
  orderDetails: state.root.orderDetails,
});

const mapDispatchToProps = { setItemsDetails, setOrderDetailsInExistingArray };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Items);
