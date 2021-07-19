import React from "react";
import { Box, Flex, Button, Link, Heading } from "@chakra-ui/react";
import NextLink from "../components/NextLink"
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NLink from "next/link"
import { useRouter } from "next/router";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="login" mr={2}>login
        </NextLink>
        <NextLink href="register">register
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NLink href="/create-post"><Button as={Link} mr={3}>Create Post</Button></NLink>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={async () => { await logout(); router.reload() }}
          isLoading={logoutFetching}
        >
          Sign Out
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tan" p={4} >
      <Flex align='center' flex={1} maxW={800} m='auto'>
        <NLink href="/"><Heading as={Link}>Mini Reddit</Heading></NLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
export default NavBar;
