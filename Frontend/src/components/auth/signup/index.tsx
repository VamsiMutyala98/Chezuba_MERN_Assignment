/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, ReactElement, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "../../../store/types/base.type";
import { ISignUpPayload } from "../../../types/login.type";
import { AuthService } from "../../../services/auth.service";
import { IGenericError } from "../../../types/error.type";
import { setUserDetails } from "../../../store/slice/base.slice";

interface IProps extends PropsFromRedux {}

const SignUp: FC<IProps> = (): ReactElement => {
  const [userDetails, setUserStateDetails] = React.useState<ISignUpPayload>({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const authService = new AuthService();

  const signUp = async ($event: SyntheticEvent) => {
    $event.preventDefault();
    const form = document.getElementById("form") as HTMLFormElement | null;
    if (form) {
      form.classList.add("was-validated");
      if (form.checkValidity()) {
        try {
          const response = await authService.signUp(userDetails);
          if (response) {
            toast.success("Signed up succesfully", { theme: "colored" });
          }
        } catch (error) {
          const err = error as IGenericError;
          toast.error(err?.response?.data?.message, { theme: "colored" });
        }
      } else {
        toast.error("Please enter sign up details", { theme: "colored" });
      }
    }
  };
  return (
    <div className="row login">
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 login--container">
        <h2 className="login--title">Signup</h2>
        <form id="form" className="row g-3 needs-validation" onSubmit={signUp} noValidate>
          <div className="col-md-6">
            <label htmlFor="validationCustom01" className="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              value={userDetails.name}
              onChange={($event) => setUserStateDetails({ ...userDetails, name: $event.target.value })}
              className="form-control"
              id="validationCustom01"
              placeholder="Enter your name"
              required
            />
            <div className="invalid-feedback">Please enter a name.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label fw-bold">
              Phone Number
            </label>
            <input
              type="text"
              value={userDetails.phoneNumber}
              onChange={($event) => setUserStateDetails({ ...userDetails, phoneNumber: $event.target.value })}
              className="form-control"
              id="validationCustom03"
              placeholder="Enter phone number"
              required
            />
            <div className="invalid-feedback">Please enter a phone number.</div>
          </div>
          <div className="col-md-12">
            <label htmlFor="validationCustom02" className="form-label fw-bold">
              Email
            </label>
            <input
              type="text"
              value={userDetails.email}
              onChange={($event) => setUserStateDetails({ ...userDetails, email: $event.target.value })}
              className="form-control"
              id="validationCustom02"
              placeholder="Enter your email"
              required
            />
            <div className="invalid-feedback">Please enter a email.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label fw-bold">
              Password
            </label>
            <div className="input-group has-validation">
              <input
                type="password"
                className="form-control"
                value={userDetails.password}
                onChange={($event) => setUserStateDetails({ ...userDetails, password: $event.target.value })}
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                placeholder="Enter password"
                required
              />
              <div className="invalid-feedback">Please enter a password.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom04" className="form-label fw-bold">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={($event) => setConfirmPassword($event.target.value)}
              className="form-control"
              id="validationCustom04"
              placeholder="Please enter a confirm password"
              required
            />
            {userDetails.password !== confirmPassword ? (
              <div className="text-danger" style={{ fontSize: "16px" }}>
                password and confirm password doesn't match
              </div>
            ) : null}
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">You must agree before submitting.</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="mb-3 login--button">
              SignUp
            </button>
          </div>
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

export default connector(SignUp);
