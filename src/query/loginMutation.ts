import { axiosQuery } from "../utils/axios";
import { loginDto } from "../dto/request/login.dto";

/**
 * Send request to API to login
 * @param values
 */
export const loginMutation = (values: loginDto) => {
  return axiosQuery<{ accessToken: string }>({
    url: "/auth/login",
    data: values,
    method: "POST",
  });
};
