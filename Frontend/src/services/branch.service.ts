import API from "../api/axios";
import { IBranchDetails } from "../types/items.type";
import { INewBranchResponse } from "../types/order.type";
import APIHelper from "../utils/helper";

export class BranchService extends APIHelper {
  async addBranch(name: string): Promise<IBranchDetails> {
    try {
      const { data } = await API.post<INewBranchResponse>("/branch", { name });
      if (data) {
        return { _id: data.data?._id, name: data?.data?.name };
      }
      return {} as IBranchDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteBranch(id: string): Promise<string> {
    try {
      const { data } = await API.delete<INewBranchResponse>(`/branch/${id}`);
      if (data) {
        return id;
      }
      return "";
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateBranch(id: string, name: string): Promise<IBranchDetails> {
    try {
      const { data } = await API.put<INewBranchResponse>(`/branch/${id}`, { name });
      if (data) {
        return { _id: data.data?._id, name: data?.data?.name };
      }
      return {} as IBranchDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
