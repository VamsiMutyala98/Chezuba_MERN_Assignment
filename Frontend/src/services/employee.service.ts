import API from "../api/axios";
import { INewEmployee } from "../components/widgets/Settings";
import { IEmployeeDetails, IEmployeeResponse } from "../types/order.type";
import APIHelper from "../utils/helper";

export class EmployeeService extends APIHelper {
  async getEmployeeDetails(): Promise<IEmployeeDetails[]> {
    try {
      const { data } = await API.get<IEmployeeResponse>("/employee");
      if (data) {
        return this.employeeDTO(data);
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addEmployee(payload: INewEmployee): Promise<IEmployeeDetails> {
    try {
      const { data } = await API.post<IEmployeeResponse>("/employee", { ...payload });
      if (data) {
        return this.newEmployeeDTO(data);
      }
      return {} as IEmployeeDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteEmployee(id: string): Promise<string> {
    try {
      const { data } = await API.delete<IEmployeeResponse>(`/employee/${id}`);
      if (data) {
        return id;
      }
      return "";
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateEmployee(id: string, payload: INewEmployee): Promise<IEmployeeDetails> {
    try {
      const { data } = await API.put<IEmployeeResponse>(`/employee/${id}`, { ...payload });
      if (data) {
        return this.newEmployeeDTO(data);
      }
      return {} as IEmployeeDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
