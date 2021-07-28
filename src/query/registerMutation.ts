import { axiosQuery } from "../utils/axios";
import { createUserDto } from "../dto/request/create-user.dto";

/**
 * Send request to API to login
 * @param values
 */
export const registerMutation = (values: createUserDto) => {
  return axiosQuery({ url: "/users/register", data: values, method: "POST" });
};
