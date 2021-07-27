import { getAccessTokenUpdated } from "./jwt";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 4000,
  withCredentials: true,
});

export const axiosQuery = async <T = any>(config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse<T> | void>(async (resolve, reject) => {
    const res: void | AxiosResponse<T> = await query
      .request<T>({
        headers: {
          authorization: `Bearer ${await getAccessTokenUpdated()}`,
        },
        ...config,
      })
      .catch((err) => {
        console.log(err.response);
        return reject(err?.response?.data);
      });
    return resolve(res);
  });
};
