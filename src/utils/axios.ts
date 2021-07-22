import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const query = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 4000,
});

export const axiosQuery = (config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    let res: void | AxiosResponse = await query
      .request(config)
      .catch((err: Error) => {
        console.error(err.message);
        return reject(err);
      });
    if (!res) {
      console.error("No response");
      return reject();
    }
    // if (res.status > 299) {
    //   console.error("Request error");
    //   return reject(res.data);
    // }
    return resolve(res);
  });
};
