import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../store/types/base.type";
import { setItemsDetails } from "../../store/actions/base.action";
import { IItemDetails } from "../../types/items.type";
import { OrderService } from "../../services/order.service";
import { IOrderPayload } from "../../types/order.type";
import { setOrderDetailsInExistingArray } from "../../store/slice/base.slice";

const orderService = new OrderService();

interface IProps extends PropsFromRedux {
  item: IItemDetails;
  countItem: number;
}

const CartItems: FC<IProps> = ({ ...props }): ReactElement => {
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

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div className="row cart--items-wrap">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
          <img src={props?.item?.img} alt={props?.item?.itemName} />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 cart--items-description">
          <h4>{props.item.itemName}</h4>
          <div className="price">
            <span>Each Price:</span>₹ {props.item.price}
          </div>
          <div className="item-remove" title="Cart Item Remove" onClick={() => addItemToCart(props.item._id, "REMOVE")}>
            <i className="fas fa-trash" />
            &nbsp;
            <span>Remove</span>
          </div>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 cart--items-quantity">
          <div className="items--quantity-layout">
            <h5>Quantity</h5>
            <span className="cart--items-action-btns">
              <span className="fw-bold" onClick={() => addItemToCart(props.item._id, "DEC")}>
                -
              </span>
              &nbsp;&nbsp;
              <span>{props.countItem}</span>&nbsp;&nbsp;
              <span className="fw-bold" onClick={() => addItemToCart(props.item._id, "INC")}>
                +
              </span>
            </span>
          </div>
          <div className="total--price">
            <span className="original--price">₹ {props.item.price * props.countItem}</span>
            <span className="discount--price">
              ₹ {props.item.price * props.countItem - ((props.item.price * props.countItem) / 100) * 5}
            </span>
          </div>
          <div className="discount">You Save 5%</div>
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

export default connector(CartItems);
