import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate } from "react-query/hydration";
import { Home } from "../components/Home";
import { MainLayout } from "../components/MainLayout";
import { getPostQuery } from "../query/getPostsQuery";
import { queryClient } from "./_app";
import Head from "next/head";

// SSR for homepage
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const query = await getPostQuery();

    if (query) {
      await queryClient.prefetchInfiniteQuery("posts", () => query);
      const dehydrated = dehydrate(queryClient);
      //workaround for dehydrate issue
      (dehydrated.queries[0].state.data as any).pageParams = [null];
      return {
        props: {
          dehydratedState: dehydrated,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {},
  };
};
const Index: React.FC = () => {
  return (
    <MainLayout variant="large">
      <Head>
        <meta name="description" content="Upload and browsing photos"></meta>
      </Head>
      <Home />
    </MainLayout>
  );
};

export default Index;
