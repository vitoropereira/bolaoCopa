import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.16.0.201:3333",
});
