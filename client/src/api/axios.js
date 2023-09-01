import axios from "axios";

const instance = axios.create({
  baseURL: "https://anotador-backendgghh.onrender.com/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default instance;
