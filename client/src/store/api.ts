import axios from "axios";
import { SERVER_URL } from "../const/const";

const TIMEOUT = 5000;
export const BASE_URL = `${SERVER_URL}api`;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  return api;
};

export const api = createApi();
