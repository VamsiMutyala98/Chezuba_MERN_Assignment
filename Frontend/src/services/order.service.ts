import API from "../api/axios";
import {
  EOrderStatus,
  IOrderAnalysis,
  IOrderAnalysisParams,
  IOrderAnalysisResponse,
  IOrderDetails,
  IOrderPayload,
  IOrderResponse,
  IUpdateOrderResponse,
} from "../types/order.type";
import APIHelper from "../utils/helper";

export class OrderService extends APIHelper {
  async createOrder(payload: IOrderPayload, type: string): Promise<IOrderDetails[]> {
    try {
      const { data } = await API.post<IOrderResponse>(`/order-placed?type=${type}`, { ...payload });
      if (data) {
        return this.orderDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOrder(orderId: string, status: EOrderStatus): Promise<IOrderDetails> {
    try {
      const { data } = await API.put<IUpdateOrderResponse>(`/update-order/${orderId}`, { status });
      if (data) {
        return this.updateOrderDTO(data);
      }
      return {} as IOrderDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getOrderDetails(status: EOrderStatus): Promise<IOrderDetails[]> {
    try {
      const params = {
        status,
      };
      const { data } = await API.get<IOrderResponse>("/order-details", { params });
      if (data) {
        return this.orderDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getOrderAnalysis(params: IOrderAnalysisParams): Promise<IOrderAnalysis[]> {
    try {
      const { data } = await API.get<IOrderAnalysisResponse>("/order-analysis", { params });
      if (data) {
        return this.orderAnalysisDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
