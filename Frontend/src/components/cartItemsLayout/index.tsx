import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
// import Items from "../widgets/items";
import { IRootState } from "../../store/types/base.type";
import { setItemsDetails, setOrderDetails } from "../../store/actions/base.action";
import CartItems from "../widgets/cartItems";
import { EOrderStatus, IOrderDetails, IOrderItemDetails } from "../../types/order.type";
import Checkout from "../widgets/checkout";

interface IProps extends PropsFromRedux {}

const CartItemsLayout: FC<IProps> = ({ ...props }): ReactElement => {
  React.useEffect(() => {
    props.setItemsDetails();
    props.setOrderDetails(EOrderStatus.CARTITEMS);
  }, []);

  const totalCount = props.orderDetails.reduce((acc, cValues) => {
    if (cValues.branchDetails._id === props.userDetails.branchId) {
      return cValues.totalPrice + acc;
    }
    return acc;
  }, 0);

  return (
    <div className="home">
      {props?.orderDetails.findIndex(
        (oDetails) =>
          oDetails.branchDetails._id === props.userDetails.branchId && oDetails.status === EOrderStatus.CARTITEMS,
      ) > -1 ? (
        <div className="row" style={{ padding: "20px 30px" }}>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 cart--items">
            {props?.items.length
              ? props?.items.map((_item) => {
                  const countItem = props.orderDetails.reduce((acc: number, cValue: IOrderDetails) => {
                    if (
                      cValue?.branchDetails?._id === props?.userDetails?.branchId &&
                      cValue?.status === EOrderStatus.CARTITEMS
                    ) {
                      return (
                        cValue.items.reduce((iAcc: number, iCValue: IOrderItemDetails) => {
                          if (iCValue._id === _item._id) {
                            return iCValue.totalItems + iAcc;
                          }
                          return iAcc;
                        }, 0) + acc
                      );
                    }
                    return acc;
                  }, 0);
                  return countItem ? <CartItems item={_item} key={_item.itemName} countItem={countItem} /> : null;
                })
              : null}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <Checkout
              totalCount={totalCount}
              orderId={
                props.orderDetails.find((oDetails) => oDetails.branchDetails._id === props.userDetails.branchId)?._id ||
                ""
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>No Cart Items in the branch</h1>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  items: state.root.items,
  orderDetails: state.root.orderDetails,
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = { setItemsDetails, setOrderDetails };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItemsLayout);
