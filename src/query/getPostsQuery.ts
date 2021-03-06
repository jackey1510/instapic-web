import { axiosQuery } from "../utils/axios";
import { PaginatedPostsDto } from "../dto/response/paginated-posts.dto";

/**
 * Get posts from api
 * @param cursor
 * @param limit
 */
export const getPostQuery = async (cursor?: Date, limit = 9) => {
  const params = !!cursor
    ? {
        limit,
        cursor,
      }
    : { limit };

  const res = await axiosQuery<PaginatedPostsDto>({
    url: "/posts",
    params,
    method: "GET",
  });
  return res ? res!.data : res;
};
