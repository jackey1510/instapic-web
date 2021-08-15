import { axiosQuery } from "../utils/axios";

export const logoutMutation = () => {
  return axiosQuery({ url: "/auth/logout", method: "DELETE" }).catch();
};
