import React, { ReactElement, FC } from "react";
import { Navigate } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import { IUserDetails } from "../../types/login.type";
import { IRootState } from "../../store/types/base.type";
import { setUserDetails } from "../../store/slice/base.slice";

interface IProps extends PropsFromRedux {
  children: JSX.Element;
}

const RequireAuth: FC<IProps> = ({ children, ...props }): ReactElement => {
  // const [isAuthenticated, setAuthentication] = React.useState<boolean>(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    userAuthenticated();
  }, []);

  const userAuthenticated = () => {
    try {
      // setLoading(true);
      const user = localStorage.getItem("user_details") ? JSON.parse(localStorage.getItem("user_details") || "") : {};
      console.log(user, Object.keys(user).length);
      if (user && Object.keys(user).length) {
        const details: IUserDetails = { ...user };
        props.setUserDetails({ ...details });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return props?.userDetails?.id !== "NA" ? children : <Navigate to="/login" />;
};

const mapStateToProps = (state: IRootState) => ({
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = { setUserDetails };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RequireAuth);
