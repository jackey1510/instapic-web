import {
  Box,



  Button, Flex, Heading,



  Skeleton, Stack,


  Text
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import NextLink from "../components/NextLink";
import { PostLayout } from "../components/PostLayout";
import { UpvoteSection } from "../components/UpvoteSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { creatUrqlClient } from "../utils/createUrqlClient";



const Index = () => {
  const [variable, setVariable] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: { limit: variable.limit, cursor: variable.cursor },
  });
  const [{ data: me, fetching: fetchingme }] = useMeQuery();

  return (
    <PostLayout variant="large">


      {fetching && !data ? (
        <Stack>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      ) : data && data.posts ? (
        <Stack>
          {data.posts.posts.map((post) => {
            // console.log(post);
            return (
              !post ? null : <Flex
                alignItems="stretch"
                key={post.id}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <UpvoteSection post={post} />

                <Box flex="auto" justifyContent="center" alignItems="center">
                  <Flex>
                    <NextLink href={`post/${post.id}`}><Heading fontSize="xl">{post.title}</Heading></NextLink>
                    <Text ml="auto" fontSize="medium">
                      by {post.creator.username}
                    </Text>
                  </Flex>
                  <Flex flex={1} align='center'>
                    <NextLink href={`post/${post.id}`}><Text mt={4}>{post.textSnippet}</Text></NextLink>
                    {!fetchingme && !(me?.me?.id === post.creatorId) ? null : <Box ml="auto"> <EditDeletePostButtons id={post.id} /></Box>}
                  </Flex>


                </Box>
              </Flex>
            );
          })}
        </Stack>
      ) : (
            <Flex key={0}>No Posts</Flex>
          )}
      {data && data.posts ? (
        <Flex>
          {" "}
          <Button
            my={8}
            mx="auto"
            onClick={() => {
              setVariable({
                cursor: data.posts.hasNext
                  ? data.posts.posts[data.posts.posts.length - 1]?.createdAt
                  : null,
                limit: variable.limit,
              });
            }}
            isLoading={fetching}
          >
            More Posts
          </Button>{" "}
        </Flex>
      ) : null}
    </PostLayout>
  );
};

export default withUrqlClient(creatUrqlClient, { ssr: true })(Index);
