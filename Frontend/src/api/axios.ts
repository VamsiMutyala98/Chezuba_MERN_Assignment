import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = "/api/v1";

const client = axios.create({ baseURL });

client.defaults.headers = {
  Authorization: "Bearer",
} as any;

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    console.log(config);
    const newConfig = config;
    // newConfig.baseURL = baseURL;
    if (newConfig && newConfig.headers && newConfig.headers.Authorization) {
      newConfig.headers.Authorization = `Bearer ${window.localStorage.getItem("access_token") || ""}`;
    }
    return newConfig;
  },
  (error) => {
    toast.error("Something went wrong");
    return Promise.reject(error);
  },
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    if (response?.data instanceof Blob) {
      return response;
    }
    return response || {};
  },
  (error) => {
    if (error?.response) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        toast.error(error?.response?.data?.message || "Session Expired! Please login again", { theme: "colored" });
        if (!window?.location?.pathname?.includes("login")) {
          window.localStorage.removeItem("access-token");
          window.localStorage.removeItem("user-details");
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }
      if (error?.response?.code === "ERR_NETWORK") {
        toast.error("Please check your connectivity. Unable to connect to server");
      }
    } else {
      toast.error("Please check your connectivity. Unable to connect to server");
    }
    return Promise.reject(error);
  },
);

export default client;
