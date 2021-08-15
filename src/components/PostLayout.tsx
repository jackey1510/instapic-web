import {
  Alert,
  AlertIcon,
  Box,
  SimpleGrid,
  Skeleton,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { PostDto } from "../dto/response/post.dto";
import { useInfinitePostQuery } from "../hooks/useInfinitePostQuery";
import { mainColor } from "../utils/colorScheme";
import { LoadMoreButton } from "./LoadMoreButton";
import PhotoWidget from "./PhotoWidget";

interface PostLayoutProps { }

const PostLayout: React.FC<PostLayoutProps> = ({ }) => {
  const [isDesktop, isTablet] = useMediaQuery([
    "(min-width: 1000px)",
    "(min-width: 650px)",
  ]);

  const { colorMode } = useColorMode();
  const limit = isDesktop ? 9 : isTablet ? 4 : 3;
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;
  const height = isDesktop ? 250 : isTablet ? 350 : 600;
  const minWidth = isTablet ? 300 : 250;
  const maxWidth = isTablet ? 300 : 500;
  const skeletons = [];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfinitePostQuery();
  let body = null;
  if (isFetching && !isFetchingNextPage) {
    //loading skeletons
    for (let i = 1; i <= limit; i++) {
      skeletons.push(
        <Skeleton
          height={height}
          color={mainColor[colorMode]}
          key={"skeleton" + i}
        />
      );
    }
    body = (
      <SimpleGrid
        columns={columns}
        minChildWidth="250px"
        spacing="40px"
        data-testid="skeletons"
      >
        {skeletons}
      </SimpleGrid>
    );
  }

  if (data && data.pages && data.pages[0]) {
    let posts: PostDto[] = [];
    data.pages.forEach((p) => {
      if (p) {
        posts = posts.concat(p.posts);
      }
    });

    const images: any[] = [];

    posts.forEach((post) => {
      return images.push(
        <PhotoWidget
          key={post.fileName}
          height={height}
          minWidth={minWidth}
          maxWidth={maxWidth}
          post={post}
        ></PhotoWidget>
      );
    });

    body = (
      <Box data-testid="postLayout">
        <SimpleGrid minChildWidth={minWidth} spacing="20px">
          {images}
        </SimpleGrid>
        {hasNextPage ? (
          <LoadMoreButton
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : null}
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        ) : null}
      </Box>
    );
  }
  return body;
};
export default PostLayout;
