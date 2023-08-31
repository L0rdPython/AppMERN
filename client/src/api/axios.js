import axios from "axios";

const instance = axios.create({
  baseURL: "https://anotador-backendgghh.onrender.com/api",
  withCredentials: true,
});

export default instance;
