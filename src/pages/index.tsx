import React, { useState } from "react";
import { MainLayout } from "../components/MainLayout";
import { axiosQuery } from "../utils/axios";
import { useInfiniteQuery, useQuery } from "react-query";
import { getPostsDto } from "../dto/request/get-posts.dto";
import { PaginatedPostsDto } from "../dto/response/paginated-posts.dto";
import { Stack, Skeleton, useColorMode } from "@chakra-ui/react";
import { mainColor } from "../utils/colorScheme";


const Index = () => {

  const [cursor, setCursor] = useState<Date>(new Date());
  const limit = 9;
  const requestBody: getPostsDto = {
    limit, cursor
  }

  const { colorMode } = useColorMode();

  // const getPostsQuery = async (_key: string, cursor: Date) => {
  //   const res = await axiosQuery<PaginatedPostsDto>({ url: '/posts', data: { limit, cursor } })
  //   if (res) {
  //     const data = res.data.posts
  //     let nextPage = new Date();
  //     if (data.length > 0) nextPage = data[data.length - 1].createdAt
  //     return {
  //       data,
  //       nextPage
  //     }
  //   }
  //   return {
  //     data: [],
  //     nextPage: new Date()
  //   }

  // }

  const getPostQuery = (cursor: Date) => {
    return axiosQuery<PaginatedPostsDto>({ url: '/posts', data: { limit, cursor } })
  }



  // const { status,
  //   data,
  //   isFetching,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage, } = useInfiniteQuery(queryKey, getPostsQuery, {
  //     getNextPageParam: (lastPage, _AllPages) => {
  //       if (lastPage) {
  //         const posts = lastPage.data.posts;

  //       }
  //     }
  //   })

  const { data, isFetching } = useQuery(['posts', cursor], () => getPostQuery(cursor), { keepPreviousData: true })

  return (
    <MainLayout variant="large">
      {isFetching && !data ? (
        <Stack>
          <Skeleton height="100px" color={mainColor[colorMode]} />
          <Skeleton height="100px" color={mainColor[colorMode]} />
          <Skeleton height="100px" color={mainColor[colorMode]} />
        </Stack>) : null}
    </MainLayout>
  );
};

export default Index;
