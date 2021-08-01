import { axiosQuery } from "./axios";
import { decode, JwtPayload } from "jsonwebtoken";
import { accessTokenDto } from "../dto/response/access_token.dto";

let accessToken = "";
let expiryTime: Date;
let fetching = false;

const setAccessToken = (token: string) => {
  accessToken = token;
  let payload = decode(accessToken);
  if (payload) {
    expiryTime = new Date((payload as JwtPayload).exp! * 1000);
    return;
  }
  expiryTime = new Date(0);
};

const getAccessToken = () => {
  return accessToken;
};

const getAccessTokenUpdated = async () => {
  if (new Date() > expiryTime || !accessToken) {
    accessToken = await refreshAccessToken();
  }
  return accessToken;
};

const refreshAccessToken = async () => {
  if (!fetching) {
    fetching = true;
    let res = await axiosQuery<accessTokenDto>({
      url: "/auth/refresh-token",
      method: "POST",
    });

    if (res) {
      setAccessToken(res?.data?.accessToken);
    }
    fetching = false;
  }
  return accessToken;
};

export const useJwtAuth = () => {
  return {
    setAccessToken,
    getAccessToken,
    refreshAccessToken,
    getAccessTokenUpdated,
  };
};
