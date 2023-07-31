import { useEffect } from "react";
import { axiosInit } from "../apis/axios";

function AxiosInit() {
  useEffect(() => {
    axiosInit();
  }, []);
  return null;
}

export default AxiosInit;