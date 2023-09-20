import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import Items from "../widgets/items";
import { IRootState } from "../../store/types/base.type";
import { setItemsDetails, setOrderDetails } from "../../store/actions/base.action";
import OrderAnalysis from "../orderAnalysis";
import OrderShipped from "../orderShipped";
import { EOrderStatus } from "../../types/order.type";

interface IProps extends PropsFromRedux {}

const Home: FC<IProps> = ({ ...props }): ReactElement => {
  React.useEffect(() => {
    props.setItemsDetails();
    if (!props.userDetails?.isAdmin) {
      props.setOrderDetails(props.userDetails.isEmployee ? EOrderStatus.ALL : EOrderStatus.CARTITEMS);
    }
  }, []);

  return (
    <div className="home">
      {/* eslint-disable-next-line no-nested-ternary */}
      {props.userDetails.isAdmin ? (
        <OrderAnalysis />
      ) : props.userDetails.isEmployee ? (
        <OrderShipped />
      ) : (
        <div className="row" style={{ display: "flex", justifyContent: "center", margin: "0", padding: 0 }}>
          {props?.items.length ? props?.items.map((_item) => <Items item={_item} key={_item.itemName} />) : null}
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

export default connector(Home);
