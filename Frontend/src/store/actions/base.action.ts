import { AuthService } from "../../services/auth.service";
import { EmployeeService } from "../../services/employee.service";
import { ItemsService } from "../../services/items.service";
import { OrderService } from "../../services/order.service";
import { IUserDetails } from "../../types/login.type";
import { EOrderStatus, IOrderAnalysisParams } from "../../types/order.type";
import {
  setUserDetails as setSliceUserDetails,
  setItemDetails as setSliceItemDetails,
  setBranchDetails as setSliceBranchDetails,
  setOrderDetails as setSliceOrderDetails,
  setOrderAnalysis as setSliceOrderAnalysis,
  updateOrderDetailsById as updateSliceOrderDetailsById,
  setEmployeeDetails as setSliceEmployeeDetails,
} from "../slice/base.slice";

const authService = new AuthService();
const itemsService = new ItemsService();
const orderService = new OrderService();
const employeeService = new EmployeeService();

export const setUserDetails = (payload: IUserDetails) => {
  return (dispatch: any) => dispatch(setSliceUserDetails(payload));
};

export const setItemsDetails = () => {
  return async (dispatch: any) => {
    try {
      const response = await itemsService.getItems();
      if (response) {
        dispatch(setSliceItemDetails(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setBranchDetails = () => {
  return async (dispatch: any) => {
    try {
      const response = await itemsService.getBranches();
      if (response) {
        dispatch(setSliceBranchDetails(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setBranchId = (branchId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await authService.updateBranchId(branchId);
      if (response) {
        dispatch(setSliceUserDetails(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setOrderDetails = (status: EOrderStatus) => {
  return async (dispatch: any) => {
    try {
      const response = await orderService.getOrderDetails(status);
      if (response) {
        dispatch(setSliceOrderDetails(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setOrderAnalysis = (params: IOrderAnalysisParams) => {
  return async (dispatch: any) => {
    try {
      const response = await orderService.getOrderAnalysis(params);
      if (response) {
        dispatch(setSliceOrderAnalysis(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateOrderDetailsById = (orderId: string, status: EOrderStatus) => {
  return async (dispatch: any) => {
    try {
      const response = await orderService.updateOrder(orderId, status);
      if (response) {
        dispatch(updateSliceOrderDetailsById(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setEmployeeDetails = () => {
  return async (dispatch: any) => {
    try {
      const response = await employeeService.getEmployeeDetails();
      if (response) {
        dispatch(setSliceEmployeeDetails(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
