import axios from "axios";
import {SIGN_IN, SIGN_OUT, SIGN_UP, USER_INFO} from "./url";

interface User {
  id: number;
  email: string;
  password: string;
  registeredDate: string;
  accessToken: string;
  status: number;
  token: number;
}

export const requestSignup = async (body: User) => {
  return await axios.post(SIGN_UP, body);
};

export const requestSignIn = async (body: {
  email: string;
  password: string;
}) => {
  return await axios.post(SIGN_IN, body)
}

export const requestSignOut = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  return await axios.post(SIGN_OUT, null, {headers});
};

export const requestUserInfo = async () => {
  const headers = {
    "ACCESS_TOKEN": localStorage.getItem("token")
  };
  const res = await axios.get(USER_INFO, {headers})
  return res.data.data;
}
