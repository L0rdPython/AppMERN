import axios from "axios";

const instance = axios.create({
  baseURL: "https://app-mern-p8kj-k8of64xau-emersonmdn.vercel.app/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default instance;
