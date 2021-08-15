import { getProfileDto } from "../dto/request/getProfile.dto";
import { axiosQuery } from "../utils/axios";
/**
 * Get profile from api
 */
export const getProfileQuery = () =>
  axiosQuery<getProfileDto>({
    url: "/users/profile",
  });
