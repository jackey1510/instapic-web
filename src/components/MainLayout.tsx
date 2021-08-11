import { Box } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";
import Wrapper, { WrapperProps } from "./Wrapper";

interface MainLayoutProps extends WrapperProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({
  variant,
  children,
}) => {
  return (
    <Box>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Box>
  );
};
