export interface ILoginPayload {
  email: string;
  password: string;
}

export enum EUserType {
  "SET_USER_DETAILS" = "setUserDetails",
  "SET_BRANCH_ID" = "setBranchId",
}

export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  branchId: string;
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isEmployee: boolean;
}

export interface IUserDetailsResponse {
  data: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    branchId: string;
    isPhoneNumberVerified: boolean;
    isAdmin: boolean;
    isCustomer: boolean;
    isEmployee: boolean;
    token: string;
  };
  message: string;
  status: number;
}

export interface ISignUpPayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
