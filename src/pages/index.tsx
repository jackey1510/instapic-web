import React from "react";
import { MainLayout } from "../components/MainLayout";
import PostLayout from "../components/PostLayout";
import { GetServerSideProps } from "next";
import { queryClient } from "./_app";
import { dehydrate } from "react-query/hydration";
import { getPostQuery } from "../query/getPostsQuery";
// import { useIsAuth } from "../utils/useIsAuth";

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
const Index = () => {
  //   useIsAuth();
  return (
    <MainLayout variant="large">
      <PostLayout />
    </MainLayout>
  );
};

export default Index;
