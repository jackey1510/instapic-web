import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";

export interface WrapperProps {
  variant?: "small" | "regular" | "large";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "small",
}) => {
  const { colorMode } = useColorMode()
  const color = { light: 'black', dark: 'white' }
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  return (
    <Box height="100vh"
      bg={bgColor[colorMode]}

      color={color[colorMode]}>
      <Box
        maxW={
          variant === "small" ? "400px" : variant === "regular" ? "800px" : "800px"
        }
        w="100%"
        ph={8}
        pt={8}
        px={8}
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
};
export default Wrapper;
