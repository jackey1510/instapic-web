import { getAccessTokenUpdated } from "./jwt";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 4000,
  withCredentials: true,
});

export const axiosQuery = async (config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse | void>(async (resolve, reject) => {
    const res: void | AxiosResponse = await query
      .request({
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
