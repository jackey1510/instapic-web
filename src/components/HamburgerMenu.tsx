import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import NLink from "next/link";
import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../pages/_app";
import { axiosQuery } from "../utils/axios";

import { useMeQuery } from "../hooks/useMeQuery";
import DarkModeSwitch from "./DarkModeSwitch";
import { mainColor } from "../utils/colorScheme";

interface HamburgerMenuProps { }
export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { colorMode } = useColorMode();

  const { data, isFetching, isSuccess } = useMeQuery();
  console.log('is fetching', isFetching)
  const logoutMutation = () => {
    return axiosQuery({ url: "/auth/logout", method: "DELETE" }).catch();
  };
  const { isLoading, mutateAsync: logout } = useMutation(
    "logout",
    logoutMutation,
    {}
  );

  let body = null;
  if (isFetching) {
    body = <Box></Box>;
  }

  if (!data && isSuccess) {
    body = (
      <>
        <DrawerBody>
          <Stack spacing="8px">
            <Box height={8}></Box>
            <NLink href="/login">
              <Button as={Link} mr={3} color={mainColor[colorMode]}>
                Login
              </Button>
            </NLink>
            <NLink href="/register">
              <Button as={Link} mr={3} color={mainColor[colorMode]}>
                Register
              </Button>
            </NLink>
          </Stack>
        </DrawerBody>
      </>
    );
  }
  // if user is signed in
  if (data && isSuccess) {
    body = (
      <>
        <DrawerHeader borderBottomWidth="1px">
          <Text color={mainColor[colorMode]} mr={4}>
            {data.username}
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing="24px">
            <NLink href="/create-post">
              <Button as={Link} mr={3} color={mainColor[colorMode]}>
                Create Post
              </Button>
            </NLink>
            <Button
              variant="link"
              onClick={async () => {
                await logout();
                await queryClient.invalidateQueries(["me", { exact: "true" }]);
                router.push("/login");
              }}
              isLoading={isLoading}
            >
              Sign Out
            </Button>
          </Stack>
        </DrawerBody>
      </>
    );
  }

  return (
    <Box data-testid='hamburgerMenu'>
      <IconButton
        aria-label="Hamburger"
        icon={<HamburgerIcon />}
        colorScheme="teal"
        onClick={onOpen}
      >
        Open
      </IconButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={mainColor[colorMode]} />
          {body}
          <DrawerFooter>
            <DarkModeSwitch />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default HamburgerMenu;
