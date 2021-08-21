import { useJwtAuth } from "../hooks/useJwtAuth";

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosQuery = async <T = any>(config: AxiosRequestConfig) => {
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
      .catch((err: AxiosError) => {
        if (err.response?.data) return reject(err?.response?.data);

        console.error(err.message);
      });
    return resolve(res);
  });
};
