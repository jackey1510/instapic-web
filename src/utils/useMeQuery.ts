import { useQuery } from "react-query";
import { axiosQuery } from "./axios";
import { getAccessToken, refreshToken } from "./jwt";
import { queryClient } from "../pages/_app";
import { UserDto } from "../dto/response/user.dto";

/**
 * Get user profile
 */
export const useMeQuery = () => {
  let token = getAccessToken();
  const meQuery = async () => {
    if (!token) {
      token = await refreshToken();
    }

    if (token) {
      // try to get me from cache first
      const me = queryClient.getQueryData<UserDto>("me");
      if (me) {
        return me;
      }
      const res = await axiosQuery<UserDto>({
        url: "/users/profile",
      }).catch((err) => console.log(err));
      return res ? res.data : res;
    }
    return;
  };

  return useQuery("me", meQuery, { retry: 0 });
};
