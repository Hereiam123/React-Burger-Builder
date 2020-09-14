import axios from "axios";
import baseUrl from "./axiosImport";

const axioInstance = axios.create({
  baseUrl,
});

export default axioInstance;
