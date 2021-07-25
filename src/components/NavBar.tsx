import { Box, Flex, Heading, Link, useColorMode } from "@chakra-ui/react";
import NLink from "next/link";
// import { useRouter } from "next/router";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {

  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.150', dark: 'gray.800' }

  const color = { light: 'black', dark: 'white' }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg={bgColor[colorMode]} p={4} >
      <Flex align='center' flex={1} maxW={800} m='auto'>
        <NLink href="/"><Heading as={Link} color={color[colorMode]}>Instapic</Heading></NLink>
        <Box ml={"auto"}><HamburgerMenu /></Box>

      </Flex>
    </Flex>
  );
};
export default NavBar;
