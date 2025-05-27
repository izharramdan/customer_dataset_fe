// src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://customerdataset-production.up.railway.app/api",
  timeout: 30000,
});

export default axiosInstance;
