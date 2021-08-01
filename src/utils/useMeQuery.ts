import { useJwtAuth } from "./useJwtAuth";
import { useQuery } from "react-query";

import { queryClient } from "../pages/_app";
import { UserDto } from "../dto/response/user.dto";
import { getProfileQuery } from "../query/getProfileQuery";

/**
 * Get user profile
 */
export const useMeQuery = () => {
  const { getAccessTokenUpdated } = useJwtAuth();

  const meQuery = async () => {
    const accessToken = await getAccessTokenUpdated();
    if (!accessToken) {
      return;
    }
    // try to get me from cache first
    const me = queryClient.getQueryData<UserDto>("me");
    if (me) {
      return me;
    }
    const res = await getProfileQuery().catch((err) => console.error(err));
    return res ? res.data : res;
  };

  return useQuery("me", meQuery, { retry: 0 });
};
