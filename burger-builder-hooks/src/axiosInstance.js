import axios from "axios";
import baseURL from "./axiosImport";

const instance = axios.create({
  baseURL,
});

export default instance;
