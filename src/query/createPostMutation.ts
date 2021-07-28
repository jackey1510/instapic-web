import { axiosQuery } from "../utils/axios";
import { createPostDto } from "../dto/request/create-post.dto";
import { createPostResponseDto } from "../dto/response/create-post-response.dto";

/**
 * Send request to API to create a new post
 * @param data
 */

export const createPostMutation = (data: createPostDto) => {
  return axiosQuery<createPostResponseDto>({
    url: "/posts",
    data,
    method: "post",
  });
};
