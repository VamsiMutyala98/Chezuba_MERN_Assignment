import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import { IRootState } from "../../store/types/base.type";
import { EOrderStatus } from "../../types/order.type";
import { updateOrderDetailsById } from "../../store/actions/base.action";

interface IProps extends PropsFromRedux {}
const OrderShipped: FC<IProps> = ({ ...props }): ReactElement => {
  return (
    <div className="row d-flex justify-content-center">
      <h1 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Orders</h1>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <table className="table table-bordered col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 shipped__table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props?.orderDetails?.length ? (
              props.orderDetails.map((_order, i) => (
                <tr key={`${_order._id}`}>
                  <td className="sNo">{i + 1}.</td>
                  <td>
                    <ul>
                      {_order.items.map((_item, index) => (
                        <li key={`${_item.itemName + index}`}>
                          {_item.itemName} - {_item.totalItems}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{_order.status}</td>
                  <td className="shipped_table_actions">
                    {_order.status === EOrderStatus.CREATED ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            props.updateOrderDetailsById(_order._id, EOrderStatus.SHIPPIED);
                            setTimeout(
                              () => props.updateOrderDetailsById(_order._id, EOrderStatus.DELIVERED),
                              60 * 100,
                            );
                          }}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="cancel__btn"
                          onClick={() => props.updateOrderDetailsById(_order._id, EOrderStatus.CANCELLED)}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      _order.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Items are ordered in this branch
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  orderDetails: state.root.orderDetails,
  branchDetails: state.root.branchDetails,
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = { updateOrderDetailsById };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OrderShipped);
