import {
  Alert,
  AlertIcon, Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Spinner,
  useColorMode,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { PaginatedPostsDto } from "../dto/response/paginated-posts.dto";
import { PostDto } from "../dto/response/post.dto";
import { getPostQuery } from "../query/getPostsQuery";
import { mainColor } from "../utils/colorScheme";
import PhotoWidget from "./PhotoWidget";

interface PostLayoutProps {
}

const PostLayout: React.FC<PostLayoutProps> = ({ }) => {
  // console.log(initailPosts)
  const [isDesktop, isTablet] = useMediaQuery([
    "(min-width: 1000px)",
    "(min-width: 600px)",
  ]);

  const { colorMode } = useColorMode();
  const limit = isDesktop ? 9 : isTablet ? 4 : 3;
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;
  const height = isDesktop ? 250 : isTablet ? 350 : 600;
  const width = isDesktop || isTablet ? 300 : 400;
  const skeletons = [];


  for (let i = 1; i <= limit; i++) {
    skeletons.push(
      <Box key={"skeleton" + i}>
        <Skeleton height={height} color={mainColor[colorMode]} />
      </Box>
    );
  }
  // const [cursor, setCursor] = React.useState<Date>();
  // const { data, isFetching, error } = useQuery(
  //   ["posts", cursor],
  //   () => getPostQuery(cursor!),
  //   {
  //     keepPreviousData: true, behavior: () => {

  //     }
  //   }
  // );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<void | PaginatedPostsDto, Error>("posts", (context) => getPostQuery(context.pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage)
        return lastPage?.nextCursor;
      return;
    }, keepPreviousData: true,
    // initialData: { pages: [initailPosts], pageParams: [] }
  });
  let body = null;
  if (isFetching && !isFetchingNextPage) {
    body = (
      <SimpleGrid columns={columns} minChildWidth="250px" spacing="40px">
        {skeletons}
      </SimpleGrid>
    );
  }

  if (data && data.pages && data.pages[0]) {
    // if (!isFetching && data) {
    let posts: PostDto[] = [];
    // const hasNextPage = !!data.data.nextCursor;
    // const fetchNextPage = () => setCursor(data.data.nextCursor!);

    data.pages.forEach((p) => {
      if (p) {
        posts = posts.concat(p.posts);
      }
    });

    // console.log(posts);


    const images: any[] = [];

    posts.forEach(post => {
      images.push(
        <PhotoWidget
          key={post.fileName}
          height={height}
          width={width}
          post={post}
        ></PhotoWidget>
      );
    })



    body = (
      <>

        <SimpleGrid columns={columns} minChildWidth="250px" spacing='20px'>
          {images}
        </SimpleGrid>

        {/* {hasNextPage ?
          <Flex mt={4} justifyContent='center' alignItems='stretch'>
            <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>Load More</Button>
          </Flex> : null} */}
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
          scrollThreshold={0}
        >
        </InfiniteScroll>

        {error ? <Alert status="error">
          <AlertIcon />
          {error}
        </Alert> : null}
      </>
    );
  }
  return body
}
export default PostLayout;
