import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate } from "react-query/hydration";
import { Home } from "../components/Home";
import { MainLayout } from "../components/MainLayout";
import { getPostQuery } from "../query/getPostsQuery";
import { queryClient } from "./_app";

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
  return (
    <MainLayout variant="large">
      <Home />
    </MainLayout>
  );
};

export default Index;
