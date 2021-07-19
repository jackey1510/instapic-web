import React from "react";
import { Box } from "@chakra-ui/react";

export interface WrapperProps {
  variant?: "small" | "regular" | "large";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "small",
}) => {
  return (
    <Box
      maxW={
        variant === "small" ? "400px" : variant === "regular" ? "800px" : "800px"
      }
      w="100%"
      ph={8}
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};
export default Wrapper;
