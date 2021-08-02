import React from "react";
import { MainLayout } from "../components/MainLayout";
import PostLayout from "../components/PostLayout";
import { GetServerSideProps } from "next";
import { queryClient } from "./_app";
import { dehydrate } from "react-query/hydration";
import { getPostQuery } from "../query/getPostsQuery";
import { useMeQuery } from "../utils/useMeQuery";
import { Flex, Spinner } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

// SSR for homepage
export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchInfiniteQuery("posts", () => getPostQuery());
  const dehydrated = dehydrate(queryClient);
  //workaround for dehydrate issue
  (dehydrated.queries[0].state.data as any).pageParams = [null];
  return {
    props: {
      dehydratedState: dehydrated,
    },
  };
};
const Index: React.FC = () => {
  const { data, isFetching } = useMeQuery();

  return (
    <MainLayout variant="large">
      {isFetching ? (
        <Flex justifyContent="center" alignItems="stretch">
          <Spinner size="xl" />
        </Flex>
      ) : null}
      {data ? (
        <PostLayout />
      ) : (
        <Text fontSize="xl" mb={4}>
          Login to browse all amazing photos!
        </Text>
      )}
    </MainLayout>
  );
};

export default Index;
