import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EBaseActions, IBaseState } from "../types/base.type";
import { IUserDetails } from "../../types/login.type";
import { IBranchDetails, IItemDetails } from "../../types/items.type";
import { IEmployeeDetails, IOrderAnalysis, IOrderDetails } from "../../types/order.type";

export const baseInitialState: IBaseState = {
  userDetails: {
    id: "NA",
    name: "NA",
    email: "NA",
    phoneNumber: "NA",
    isPhoneNumberVerified: false,
    branchId: "",
    isEmployee: false,
    isAdmin: false,
    isCustomer: false,
  },
  items: [],
  branchDetails: [],
  orderDetails: [],
  orderAnalysis: [],
  employeeDetails: [],
};

const name = "BASE" as never;

const slice = createSlice({
  name,
  initialState: baseInitialState,
  reducers: {
    [EBaseActions.SET_USER_DETAILS](state, action: PayloadAction<IUserDetails>) {
      state.userDetails = action.payload;
    },
    [EBaseActions.SET_ITEM_DETAILS](state, action: PayloadAction<IItemDetails[]>) {
      state.items = action.payload;
    },
    [EBaseActions.SET_BRANCH_DETAILS](state, action: PayloadAction<IBranchDetails[]>) {
      state.branchDetails = action.payload;
    },
    [EBaseActions.SET_ORDER_DETAILS](state, action: PayloadAction<IOrderDetails[]>) {
      state.orderDetails = action.payload;
    },
    [EBaseActions.SET_ORDER_DETAILS_IN_EXISTING_ARRAY](state, action: PayloadAction<IOrderDetails[]>) {
      const orderIndexExists = state.orderDetails.findIndex((oDetails) => oDetails._id === action.payload[0]._id);
      if (orderIndexExists > -1) {
        [state.orderDetails[orderIndexExists]] = action.payload;
      } else {
        state.orderDetails = [...state.orderDetails, ...action.payload];
      }
    },
    [EBaseActions.SET_ORDER_ANALYSIS](state, action: PayloadAction<IOrderAnalysis[]>) {
      state.orderAnalysis = action.payload;
    },
    [EBaseActions.UPDATE_ORDER_DETAILS_BY_ID](state, action: PayloadAction<IOrderDetails>) {
      const index = state.orderDetails.findIndex((oDetails) => oDetails._id === action.payload._id);
      if (index > -1) {
        state.orderDetails.splice(index, 1, action.payload);
      }
    },
    [EBaseActions.SET_EMPLOYEE_DETAILS](state, action: PayloadAction<IEmployeeDetails[]>) {
      state.employeeDetails = action.payload;
    },
    [EBaseActions.SET_NEW_EMPLOYEE_DETAILS](state, action: PayloadAction<IEmployeeDetails>) {
      state.employeeDetails.push(action.payload);
    },
    [EBaseActions.UPDATE_EMPLOYEE_DETAILS](state, action: PayloadAction<IEmployeeDetails>) {
      const index = state.employeeDetails.findIndex((eDetails) => eDetails._id === action.payload._id);
      if (index > -1) {
        state.employeeDetails.splice(index, 1, action.payload);
      }
    },
    [EBaseActions.DELETE_EMPLOYEE_DETAILS](state, action: PayloadAction<string>) {
      const index = state.employeeDetails.findIndex((eDetails) => eDetails._id === action.payload);
      if (index > -1) {
        state.employeeDetails.splice(index, 1);
      }
    },
    [EBaseActions.SET_NEW_BRANCH_DETAILS](state, action: PayloadAction<IBranchDetails>) {
      state.branchDetails.push(action.payload);
    },
    [EBaseActions.UPDATE_BRANCH_DETAILS](state, action: PayloadAction<IBranchDetails>) {
      const index = state.branchDetails.findIndex((eDetails) => eDetails._id === action.payload._id);
      if (index > -1) {
        state.branchDetails.splice(index, 1, action.payload);
      }
    },
    [EBaseActions.DELETE_BRANCH_DETAILS](state, action: PayloadAction<string>) {
      const index = state.branchDetails.findIndex((eDetails) => eDetails._id === action.payload);
      if (index > -1) {
        state.branchDetails.splice(index, 1);
      }
    },
  },
});

export const { [EBaseActions.SET_USER_DETAILS]: setUserDetails } = slice.actions;
export const { [EBaseActions.SET_ITEM_DETAILS]: setItemDetails } = slice.actions;
export const { [EBaseActions.SET_BRANCH_DETAILS]: setBranchDetails } = slice.actions;
export const { [EBaseActions.SET_ORDER_DETAILS]: setOrderDetails } = slice.actions;
export const { [EBaseActions.SET_ORDER_DETAILS_IN_EXISTING_ARRAY]: setOrderDetailsInExistingArray } = slice.actions;
export const { [EBaseActions.SET_ORDER_ANALYSIS]: setOrderAnalysis } = slice.actions;
export const { [EBaseActions.UPDATE_ORDER_DETAILS_BY_ID]: updateOrderDetailsById } = slice.actions;
export const { [EBaseActions.SET_EMPLOYEE_DETAILS]: setEmployeeDetails } = slice.actions;
export const { [EBaseActions.SET_NEW_EMPLOYEE_DETAILS]: setNewEmployeeDetails } = slice.actions;
export const { [EBaseActions.UPDATE_EMPLOYEE_DETAILS]: updateEmployeeDetails } = slice.actions;
export const { [EBaseActions.DELETE_EMPLOYEE_DETAILS]: deleteEmployeeDetails } = slice.actions;
export const { [EBaseActions.SET_NEW_BRANCH_DETAILS]: setNewBranchDetails } = slice.actions;
export const { [EBaseActions.UPDATE_BRANCH_DETAILS]: updateBranchDetails } = slice.actions;
export const { [EBaseActions.DELETE_BRANCH_DETAILS]: deleteBranchDetails } = slice.actions;
export default slice.reducer;
