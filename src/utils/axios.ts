import { useJwtAuth } from "../hooks/useJwtAuth";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosQuery = async <T = any>(config: AxiosRequestConfig) => {
  console.log("axios config", config);
  const { getAccessTokenUpdated } = useJwtAuth();
  return new Promise<AxiosResponse<T> | void>(async (resolve, reject) => {
    config = {
      headers: {
        authorization: `Bearer ${await getAccessTokenUpdated()}`,
      },
      ...config,
    };
    const res: void | AxiosResponse<T> = await query
      .request<T>(config)
      .catch((err) => {
        return reject(err?.response?.data);
      });
    return resolve(res);
  });
};
