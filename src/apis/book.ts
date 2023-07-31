import axios, {AxiosResponse} from "axios";
import {BOOK, RECENT_BOOK} from "./url";

interface Book {
  id: number;
  userId: number;
  postalCode: string;
  address: string;
  detailedAddress: string;
  dateRegistered: number;
  dateProcessed: number;
  status: number;
  amount: number;
}

export const requestBook = async (body: {
  postal_code: string;
  address: string;
  detailed_address: string;
}): Promise<AxiosResponse<Book>> => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  return await axios.post(BOOK, body, {headers});
};

export const requestRecentBook = async() => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  const res = await axios.get(RECENT_BOOK, {headers});
  return res.data.data;
}