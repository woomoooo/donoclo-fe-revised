import { GET_BOTTOM_IMAGE, GET_TOP_IMAGE } from "./url";
import axios from "axios";

export const requestTopImage = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  const res = await axios.get(GET_TOP_IMAGE, {headers});
  return res.data.map((item: any) => {
    return item.img
  });
}

export const requestBottomImage = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  const res = await axios.get(GET_BOTTOM_IMAGE, {headers});
  return res.data.map((item: any) => {
    return item.img
  });
}
