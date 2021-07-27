import { useQuery } from "react-query";
import { axiosQuery } from "./axios";
import { getAccessToken, refreshToken } from "./jwt";
import { queryClient } from "../pages/_app";
import { AxiosResponse } from "axios";
import { UserDto } from "../dto/response/user.dto";

export const useMeQuery = () => {
  let token = getAccessToken();
  const meQuery = async () => {
    if (!token) {
      token = await refreshToken();
    }

    if (token) {
      // try to get me from cache first
      const me = queryClient.getQueryData<AxiosResponse<UserDto>>("me");
      if (me) {
        return me;
      }
      return axiosQuery<UserDto>({ url: "/users/profile" }).catch((err) =>
        console.log(err)
      );
    }
    return;
  };

  return useQuery("me", meQuery, { retry: 0 });
};
