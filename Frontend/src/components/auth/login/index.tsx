/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, ReactElement, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../../store/slice/base.slice";
import { IRootState } from "../../../store/types/base.type";
import { ILoginPayload } from "../../../types/login.type";
import { AuthService } from "../../../services/auth.service";
import { IGenericError } from "../../../types/error.type";

interface IProps extends PropsFromRedux {}

const Login: FC<IProps> = ({ ...props }): ReactElement => {
  const [userDetails, setUserStateDetails] = React.useState<ILoginPayload>({ email: "", password: "" });
  const authService = new AuthService();
  const navigate = useNavigate();

  const login = async ($event: SyntheticEvent) => {
    $event.preventDefault();
    const form = document.getElementById("form") as HTMLFormElement | null;
    if (form) {
      form.classList.add("was-validated");
      if (form.checkValidity()) {
        try {
          const response = await authService.login(userDetails);
          if (response) {
            props.setUserDetails(response);
            navigate("..");
            toast.success("Logged in succesfully", { theme: "colored" });
          }
        } catch (error) {
          const err = error as IGenericError;
          toast.error(err?.response?.data?.message, { theme: "colored" });
        }
      } else {
        toast.error("Please enter login creditials", { theme: "colored" });
      }
    }
  };
  return (
    <div className="row login">
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 login--container">
        <h2 className="login--title">Login</h2>
        <form id="form" className="needs-validation" noValidate onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label fw-bold">
              <i className="fas fa-user me-2" />
              Email:
            </label>
            <input
              type="text"
              value={userDetails.email}
              onChange={($event) => setUserStateDetails({ ...userDetails, email: $event.target.value })}
              className="form-control"
              placeholder="Enter your username"
              id="usernameInput"
              required
            />
            <div className="invalid-feedback">Please enter a username.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label fw-bold">
              <i className="fas fa-lock me-2" />
              Password:
            </label>
            <input
              type="password"
              value={userDetails.password}
              onChange={($event) => setUserStateDetails({ ...userDetails, password: $event.target.value })}
              className="form-control"
              placeholder="Enter your password"
              id="passwordInput"
              required
            />
            <div className="invalid-feedback">Please enter a password.</div>
          </div>
          <button type="submit" className="mb-3 login--button">
            Login
          </button>
          <label className="login--forget-password">Forgot Password?</label>
          <label htmlFor="redirectToSignUpPage" className="login--redirect-signup">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={($event) => {
                $event.preventDefault();
                navigate("/sign-up");
              }}
            >
              Sign up
            </a>
          </label>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = { setUserDetails };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
