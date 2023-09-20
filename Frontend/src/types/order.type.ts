import { IBranchDetails } from "./items.type";
import { IUserDetails } from "./login.type";

export interface IOrderPayload {
  branchId: string;
  itemId: string;
}

export interface IOrderItems {
  itemId: string;
  totalItems: number;
}

export interface IOrderResponse {
  message: string;
  status: number;
  data: IOrderDetails[];
}

export interface IUpdateOrderResponse {
  message: string;
  status: number;
  data: IOrderDetails[];
}

export enum EOrderStatus {
  ALL = "ALL",
  CARTITEMS = "CARTITEMS",
  CREATED = "CREATED",
  SHIPPIED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface IOrderDetails {
  _id: string;
  orderId: string;
  branchDetails: IBranchDetails;
  userDetails: IUserDetails;
  status: EOrderStatus;
  totalPrice: number;
  items: IOrderItemDetails[];
}

export interface IOrderItemDetails {
  _id: string;
  itemName: string;
  totalItems: number;
}

export interface IOrderAnalysis {
  _id: string;
  type: string;
  totalItems: number;
  totalPrice: number;
}

export interface IOrderAnalysisResponse {
  data: IOrderAnalysis[];
  message: string;
  status: number;
}

export interface IOrderAnalysisParams {
  branchId: string;
  fromDate: string;
  endDate: string;
  status: EOrderStatus;
}

export interface IEmployeeResponse {
  status: number;
  message: string;
  data: IEmployeeDetails[];
}

export interface IEmployeeDetails {
  _id: string;
  name: string;
  email: string;
  branchDetails: {
    _id: string;
    name: string;
  };
  phoneNumber: string;
  isPhoneNumberVerified: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isEmployee: boolean;
}

export interface INewBranchResponse {
  status: number;
  message: string;
  data: IBranchDetails;
}
