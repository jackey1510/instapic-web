import React from "react";
import { useMeQuery } from "../hooks/useMeQuery";
import { Flex, Spinner, Link, Text } from "@chakra-ui/react";
import PostLayout from "./PostLayout";
import NextLink from "next/link";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data, isFetching } = useMeQuery();
  if (isFetching) {
    return (
      <Flex justifyContent="center" alignItems="stretch">
        <Spinner size="xl" data-testid="spinner" />
      </Flex>
    );
  }
  if (data) {
    return <PostLayout />;
  }
  return (
    <Flex justifyContent="center" alignItems="stretch">
      <NextLink href="/login">
        <Text as={Link} fontSize="3xl" mb={4}>
          Login to browse all amazing photos!
        </Text>
      </NextLink>
    </Flex>
  );
};
export default Home;
