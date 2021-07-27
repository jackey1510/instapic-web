import { axiosQuery } from "./axios";
import { decode, JwtPayload } from "jsonwebtoken";
import { accessTokenDto } from "../dto/response/access_token.dto";

export let accessToken = "";
export let expiryTime: Date;

export const setAccessToken = (token: string) => {
  accessToken = token;
  let payload = decode(accessToken);
  if (payload) {
    expiryTime = new Date((payload as JwtPayload).exp! * 1000);
    return;
  }
  expiryTime = new Date(0);
};

export const getAccessToken = () => {
  return accessToken;
};

export const getAccessTokenUpdated = async () => {
  if (!accessToken) {
    return "";
  }

  if (new Date() > expiryTime) {
    accessToken = await refreshToken();
  }
  return accessToken;
};

export const refreshToken = async () => {
  let res = await axiosQuery<accessTokenDto>({
    url: "/auth/refresh-token",
    method: "POST",
  });

  if (res) {
    setAccessToken(res?.data?.accessToken);
  }
  return accessToken;
};
