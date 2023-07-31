import { createSlice } from "@reduxjs/toolkit";
import Localstorage from "../utils/LocalStorage";
import { axiosInit } from "../apis/axios"

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

const initialState: User = {
  id: 0,
  email: Localstorage.getItem('email') || "",
  name: "",
  token: Localstorage.getItem("token") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: User) => {
      state.email = "";
      state.name = "";
      state.id = 0;
      state.token = "";
      Localstorage.removeItem("token");
      Localstorage.removeItem("email");
      axiosInit();
    },
    login: (state: User, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      if (action.payload.token) {
        Localstorage.setItem("token", action.payload.token);
        axiosInit();
      }
      if (action.payload.email) {
        Localstorage.setItem("email", action.payload.email);
        axiosInit();
      }
    },
    updateUser: (state: User, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.name) {
        state.name = action.payload.name;
      }
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
