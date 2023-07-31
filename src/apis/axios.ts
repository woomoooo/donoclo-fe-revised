import axios, {AxiosResponse} from "axios";
import Localstorage from "../utils/LocalStorage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.baseURL = API_URL;

export const axiosInit = () => {
  const token = Localstorage.getItem("token");
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
};

export interface ApiResponse <T> extends AxiosResponse {
  data: {
    data: T;
  };
}
