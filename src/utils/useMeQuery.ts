import { useQuery } from "react-query";
import { axiosQuery } from "./axios";
import { getAccessToken, refreshToken } from "./jwt";

export interface UserDto {
  username: string;
  email: string;
  bio: string;
}

export const useMeQuery = () => {
  let token = getAccessToken();
  const meQuery = async () => {
    if (!token) {
      token = await refreshToken();
    }
    if (token) {
      return axiosQuery<UserDto>({ url: "/users/profile" }).catch((err) =>
        console.log(err)
      );
    }
    return;
  };

  return useQuery("me", meQuery, { retry: 0 });
};
