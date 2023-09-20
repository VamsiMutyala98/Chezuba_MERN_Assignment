import { IBranchDetails, IBranchResponse, IItemDetails, IItemsResponse } from "../types/items.type";
import { IUserDetails, IUserDetailsResponse } from "../types/login.type";
import {
  IEmployeeDetails,
  IEmployeeResponse,
  IOrderAnalysis,
  IOrderAnalysisResponse,
  IOrderDetails,
  IOrderResponse,
  IUpdateOrderResponse,
} from "../types/order.type";
// import { IOrderResponse } from "../types/order.type";

class APIHelper {
  userDTO(userData: IUserDetailsResponse): IUserDetails {
    return {
      id: userData?.data._id || "NA",
      name: userData?.data.name || "NA",
      email: userData?.data?.email || "NA",
      phoneNumber: userData?.data?.phoneNumber || "NA",
      branchId: userData?.data?.branchId || "",
      isPhoneNumberVerified: userData?.data?.isPhoneNumberVerified || false,
      isAdmin: userData?.data?.isAdmin || false,
      isEmployee: userData?.data?.isEmployee || false,
      isCustomer: userData?.data?.isCustomer || false,
    };
  }

  employeeDTO(userData: IEmployeeResponse): IEmployeeDetails[] {
    return userData.data.map((data) => ({
      _id: data._id || "NA",
      name: data.name || "NA",
      email: data?.email || "NA",
      phoneNumber: data?.phoneNumber || "NA",
      branchDetails: data?.branchDetails || "",
      isPhoneNumberVerified: data?.isPhoneNumberVerified || false,
      isAdmin: data?.isAdmin || false,
      isEmployee: data?.isEmployee || false,
      isCustomer: data?.isCustomer || false,
    }));
  }

  newEmployeeDTO(userData: IEmployeeResponse): IEmployeeDetails {
    return {
      _id: userData?.data[0]?._id || "NA",
      name: userData?.data[0]?.name || "NA",
      email: userData?.data[0]?.email || "NA",
      phoneNumber: userData?.data[0]?.phoneNumber || "NA",
      branchDetails: userData?.data[0]?.branchDetails || "",
      isPhoneNumberVerified: userData?.data[0]?.isPhoneNumberVerified || false,
      isAdmin: userData?.data[0]?.isAdmin || false,
      isEmployee: userData?.data[0]?.isEmployee || false,
      isCustomer: userData?.data[0]?.isCustomer || false,
    };
  }

  itemDTO(itemData: IItemsResponse): IItemDetails[] {
    return itemData.data.map((item) => ({
      _id: item?._id || "",
      itemName: item.itemName || "",
      img: item.img || "",
      price: item.price || 0,
    }));
  }

  orderDTO(itemData: IOrderResponse): IOrderDetails[] {
    return itemData.data.map((item) => ({
      _id: item._id,
      orderId: item.orderId,
      branchDetails: item.branchDetails,
      userDetails: item?.userDetails,
      status: item?.status,
      totalPrice: item?.totalPrice || 0,
      items: item?.items,
    }));
  }

  updateOrderDTO(itemData: IUpdateOrderResponse): IOrderDetails {
    return {
      _id: itemData?.data[0]._id,
      orderId: itemData?.data[0].orderId,
      branchDetails: itemData?.data[0].branchDetails,
      userDetails: itemData?.data[0]?.userDetails,
      status: itemData?.data[0]?.status,
      totalPrice: itemData?.data[0]?.totalPrice || 0,
      items: itemData?.data[0]?.items,
    };
  }

  branchDTO(branchData: IBranchResponse): IBranchDetails[] {
    return branchData.data.map((branch) => ({
      _id: branch?._id || "NA",
      name: branch?.name || "NA",
    }));
  }

  orderAnalysisDTO(itemData: IOrderAnalysisResponse): IOrderAnalysis[] {
    return itemData.data.map((item) => ({
      _id: item._id,
      type: item?.type || "",
      totalItems: item?.totalItems || 0,
      totalPrice: item?.totalPrice || 0,
    }));
  }
}

export default APIHelper;
