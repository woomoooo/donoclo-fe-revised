import {AVATAR, UPDATE_AVATAR} from "./url";
import axios from "axios";


export interface Avatar {
  id: number;
  name: string;
  userId: number;
  background: number;
  hair: number;
  top: string;
  bottom: string;
  one_piece: number;
}


export const requestAvatar = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  const res = await axios.get(AVATAR, {headers});
  return res.data.data;
}

export const requestAvatarUpdate = async (body: {
  name: string;
  background: number;
  hair: number;
  top: string;
  bottom: string;
  one_piece: number;
}): Promise<Avatar> => {
  const token = localStorage.getItem("token");
  const headers = {
    "ACCESS_TOKEN": token
  };
  return await axios.post(UPDATE_AVATAR, body, {headers});
}