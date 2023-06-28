import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../const/const";
import { storageUtils } from "../utils/storage-utils";
import { StatusCode } from "../const/errors";
import { getRefresh } from "./refresh-api";
import { adaptLoginUserDataToClient } from "../utils/adapters/user-adapters";
import { store } from "./store";
import { setUser } from "./actions";

const TIMEOUT = 5000;
export const BASE_URL = `${SERVER_URL}api`;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = storageUtils.getToken();
    if (config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (value) => value,
    async (error: AxiosError) => {
      if (error.response?.status === StatusCode.NotAuthError) {
        try {
          const { data } = await getRefresh();
          const userData = adaptLoginUserDataToClient(data);
          storageUtils.setData(userData);
          store.dispatch(setUser(userData.user));
          return api.request(error.config);
        } catch {
          storageUtils.removeData();
          store.dispatch(setUser(null));
        }
      }
      throw error;
    },
  );

  return api;
};


export const api = createApi();
