import axios from "axios";

const instance = axios.create({
  baseURL: "app-mern-p8kj.vercel.app/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default instance;
