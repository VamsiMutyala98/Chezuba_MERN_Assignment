import { IBranchDetails, IItemDetails } from "../../types/items.type";
import { IUserDetails } from "../../types/login.type";
import { IEmployeeDetails, IOrderAnalysis, IOrderDetails } from "../../types/order.type";

export enum EBaseActions {
  SET_USER_DETAILS = "@@SET_USER_DETAILS",
  SET_ITEM_DETAILS = "@@SET_ITEM_DETAILS",
  SET_BRANCH_DETAILS = "@@SET_BRANCH_DETAILS",
  SET_ORDER_DETAILS = "@@SET_ORDER_DETAILS",
  SET_ORDER_DETAILS_IN_EXISTING_ARRAY = "@@SET_ORDER_DETAILS_IN_EXISTING_ARRAY",
  SET_ORDER_ANALYSIS = "@@SET_ORDER_ANALYSIS",
  UPDATE_ORDER_DETAILS_BY_ID = "@@UPDATE_ORDER_DETAILS_BY_ID",
  SET_EMPLOYEE_DETAILS = "@@SET_EMPLOYEE_DETAILS",
  SET_NEW_EMPLOYEE_DETAILS = "@@SET_NEW_EMPLOYEE_DETAILS",
  DELETE_EMPLOYEE_DETAILS = "@@DELETE_EMPLOYEE_DETAILS",
  UPDATE_EMPLOYEE_DETAILS = "@@UPDATE_EMPLOYEE_DETAILS",
  SET_NEW_BRANCH_DETAILS = "@@SET_NEW_BRANCH_DETAILS",
  DELETE_BRANCH_DETAILS = "@@DELETE_BRANCH_DETAILS",
  UPDATE_BRANCH_DETAILS = "@@UPDATE_BRANCH_DETAILS",
}

export interface ILoginPage {
  header: string;
}

export interface IDashboardPage {
  header: string;
}

export interface IBaseState {
  userDetails: IUserDetails;
  items: IItemDetails[];
  branchDetails: IBranchDetails[];
  orderDetails: IOrderDetails[];
  orderAnalysis: IOrderAnalysis[];
  employeeDetails: IEmployeeDetails[];
}

export interface IRootState {
  root: IBaseState;
}

export interface ILoginSliceAction {
  name: string;
}

export interface IDashboardSliceAction {
  name: string;
}

export type BaseAction = {
  type: EBaseActions;
  payload: IBaseState;
};
