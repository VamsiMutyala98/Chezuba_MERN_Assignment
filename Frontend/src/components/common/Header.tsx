import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IRootState } from "../../store/types/base.type";

import logo from "../../assets/logo.png";
import { setBranchDetails, setBranchId } from "../../store/actions/base.action";
import { EOrderStatus } from "../../types/order.type";

interface IProps extends PropsFromRedux {}

const Header: FC<IProps> = ({ ...props }): ReactElement => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    props.setBranchDetails();
  }, []);

  const onBranchChange = ($event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setBranchId($event.target.value);
  };

  const onClickOption = (value: string) => {
    if (value === "logout") {
      navigate("/login");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_details");
    }
    if (value === "settings") {
      navigate("/settings");
    }
  };

  const cartCount =
    props?.orderDetails.find(
      (oDetails) =>
        oDetails.branchDetails._id === props.userDetails.branchId && oDetails.status === EOrderStatus.CARTITEMS,
    )?.items?.length || 0;

  const onClickCartButton = () => {
    if (!props?.userDetails?.branchId) {
      toast.warning("Please select branch name", { theme: "colored" });
      return;
    }
    navigate("/cart-items");
  };

  const debouncedSearch = () => {};
  return (
    <div className="row header">
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
        <img
          src={logo}
          alt="Star-Bakery-Logo"
          height="70"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 search--wrap">
        <div className="search--container">
          <input
            value={searchQuery}
            className="search--container-input"
            onChange={($event) => setSearchQuery($event.target.value)}
            type="text"
            placeholder="Search"
            onInput={debouncedSearch}
          />
          {searchQuery ? (
            <i className="fas fa-x header--logos search--container-cross-icon" title="Remove Search" />
          ) : null}
          <i className="fas fa-search header--logos search--container-icon" title="search" />
        </div>
      </div>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 header--logos-container">
        <div className="form-group">
          {!props.userDetails?.isAdmin && !props.userDetails?.isEmployee ? (
            <select
              id="branch_id"
              className="form-select"
              value={props.userDetails.branchId}
              onChange={($event) => onBranchChange($event)}
            >
              <option value="">Select Branch</option>
              {props?.branchDetails.map((_branch) => (
                <option value={_branch._id} key={_branch._id}>
                  {_branch.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        {!props.userDetails?.isAdmin && !props.userDetails?.isEmployee ? (
          <div className="cart--items-container" onClick={() => onClickCartButton()}>
            <i className="fas fa-cart-shopping header--logos" title="cart-items" />
            {cartCount ? <div className="cart--items-count">{`${cartCount}`}</div> : null}
          </div>
        ) : null}
        <div className={`dropdown dropdown--container ${isDropdownOpen ? "show" : ""}`}>
          <button
            className="dropdown-toggle dropdown--toggle"
            type="button"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {props.userDetails.name.split(" ")[0]} <i className="fas fa-user header--logos" title="user" />
          </button>
          <ul className={`dropdown-menu dropdown--menu ${isDropdownOpen ? "show" : ""}`}>
            {props?.userDetails?.isAdmin ? (
              <li title="Settings" onClick={() => onClickOption("settings")}>
                Settings
              </li>
            ) : null}
            <li title="logout" onClick={() => onClickOption("logout")}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  userDetails: state.root.userDetails,
  branchDetails: state.root.branchDetails,
  orderDetails: state.root.orderDetails,
});

const mapDispatchToProps = { setBranchDetails, setBranchId };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
