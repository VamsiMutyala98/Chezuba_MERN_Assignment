import API from "../api/axios";
import { IItemsResponse, IItemDetails, IBranchDetails, IBranchResponse } from "../types/items.type";
import APIHelper from "../utils/helper";

export class ItemsService extends APIHelper {
  async getItems(): Promise<IItemDetails[]> {
    try {
      const { data } = await API.get<IItemsResponse>("/items");
      if (data) {
        return this.itemDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getBranches(): Promise<IBranchDetails[]> {
    try {
      const { data } = await API.get<IBranchResponse>("/branch");
      if (data) {
        return this.branchDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
