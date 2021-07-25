import { axiosQuery } from "./axios";
import { decode, JwtPayload } from "jsonwebtoken";

export let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const getAccessTokenUpdated = async () => {
  if (!accessToken) {
    return "";
  }
  let payload = decode(accessToken);
  if (payload) {
    let expiryTime = new Date((payload as JwtPayload).exp!);
    if (new Date() < expiryTime) {
      accessToken = await refreshToken();
    }
  }
  return accessToken;
};

export const refreshToken = async () => {
  let res = await axiosQuery({ url: "/auth/refresh-token", method: "POST" });
  if (res) accessToken = res?.data?.accessToken;
  return accessToken;
};
