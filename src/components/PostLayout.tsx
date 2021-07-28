import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Skeleton,
  Spinner,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { getPostsDto } from "../dto/request/get-posts.dto";
import { PaginatedPostsDto } from "../dto/response/paginated-posts.dto";
import { queryClient } from "../pages/_app";
import { axiosQuery } from "../utils/axios";
import { mainColor } from "../utils/colorScheme";
import PhotoWidget from "./PhotoWidget";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDto } from "../dto/response/post.dto";

interface PostLayoutProps {}

const PostLayout: React.FC<PostLayoutProps> = ({}) => {
  const [cursor, setCursor] = useState<Date>();
  const [isDesktop, isTablet] = useMediaQuery([
    "(min-width: 1000px)",
    "(min-width: 600px)",
  ]);

  const { colorMode } = useColorMode();
  const limit = isDesktop ? 9 : isTablet ? 4 : 1;
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;
  const height = isDesktop ? "250" : isTablet ? "350px" : "600px";
  const width = isDesktop || isTablet ? "300px" : "400px";
  const skeletons = [];

  const getPostQuery = (cursor: Date) => {
    // const cache = queryClient.getQueryData<AxiosResponse<PaginatedPostsDto>>([
    //   "posts",
    // ]);
    // const cache = queryClient.getQueryCache();
    // console.log("cache", cache);
    // if (cache) {
    //   return cache;
    // }
    return axiosQuery<PaginatedPostsDto>({
      url: "/posts",
      params: { limit, cursor } as getPostsDto,
      method: "GET",
    });
  };
  for (let i = 1; i <= limit; i++) {
    skeletons.push(
      <Box key={"skeleton" + i}>
        <Skeleton height={height} color={mainColor[colorMode]} />
      </Box>
    );
  }
  //   const { data, isFetching } = useQuery(
  //     ["posts", cursor, limit],
  //     () => getPostQuery(cursor!, limit),
  //     { keepPreviousData: true }
  //   );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("posts", (context) => getPostQuery(context.pageParam), {
    getNextPageParam: (lastPage) => {
      console.log(lastPage?.data.nextCursor);
      return lastPage?.data.nextCursor;
    },
  });
  let body = null;
  if (!data) {
    body = (
      <SimpleGrid columns={columns} minChildWidth="250px" spacing="40px">
        {skeletons}
      </SimpleGrid>
    );
  }

  if (!isFetching && data && data.pages && data.pages && data.pages[0]) {
    let posts: PostDto[] = [];

    data.pages.forEach((p) => {
      if (p) {
        posts = posts.concat(p.data.posts);
      }
    });

    console.log(posts);

    const images = [];

    for (let i = 0; i < posts.length; i++) {
      images.push(
        <PhotoWidget
          key={posts[i].fileName}
          height={height}
          width={width}
          post={posts[i]}
        ></PhotoWidget>
      );
    }
    body = (
      <>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage!}
          loader={
            isFetchingNextPage ? (
              <Flex justifyContent="center" alignItems="stretch">
                <Spinner justifySelf="center"></Spinner>
              </Flex>
            ) : null
          }
        >
          <SimpleGrid columns={columns} minChildWidth="250px" spacing="40px">
            {images}
          </SimpleGrid>
        </InfiniteScroll>
        {/* {hasNextPage ? (
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        ) : null} */}
      </>
    );
  }
  return <>{body}</>;
};
export default PostLayout;
