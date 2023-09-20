import API from "../api/axios";
import { ILoginPayload, ISignUpPayload, IUserDetails, IUserDetailsResponse } from "../types/login.type";
import APIHelper from "../utils/helper";

export class AuthService extends APIHelper {
  // eslint-disable-next-line class-methods-use-this
  get baseURL() {
    return process.env.REACT_APP_API_URL || "";
  }

  async login(details: ILoginPayload): Promise<IUserDetails> {
    try {
      const { data } = await API.post<IUserDetailsResponse>("/login", { ...details });
      if (data) {
        localStorage.setItem("access_token", data?.data?.token);
        const userData: IUserDetails = this.userDTO(data);
        localStorage.setItem("user_details", JSON.stringify(userData));
        return userData;
      }
      return {} as IUserDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signUp(details: ISignUpPayload): Promise<IUserDetails> {
    try {
      const { data } = await API.post<IUserDetailsResponse>("/sign-up", { ...details });
      if (data) {
        localStorage.setItem("access_token", data?.data?.token);
        const userData: IUserDetails = this.userDTO(data);
        localStorage.setItem("user_details", JSON.stringify(userData));
        return userData;
      }
      return {} as IUserDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateBranchId(branchId: string): Promise<IUserDetails> {
    try {
      const { data } = await API.post<IUserDetailsResponse>("/user", { branchId });
      if (data) {
        return this.userDTO(data);
      }
      return {} as IUserDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
