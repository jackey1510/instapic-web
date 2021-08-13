import { useInfiniteQuery } from "react-query";
import { PaginatedPostsDto } from "../dto/response/paginated-posts.dto";
import { getPostQuery } from "../query/getPostsQuery";

export const useInfinitePostQuery = () => {
  return useInfiniteQuery<void | PaginatedPostsDto, Error>(
    "posts",
    (context) => getPostQuery(context.pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage) return lastPage?.nextCursor;
        return;
      },
      keepPreviousData: true,
    }
  );
};
