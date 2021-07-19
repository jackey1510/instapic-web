import React from "react";
import NavBar from "./NavBar";
import Wrapper, { WrapperProps } from "./Wrapper";

interface PostLayoutPrpos extends WrapperProps {}

export const PostLayout: React.FC<PostLayoutPrpos> = ({
  variant,
  children,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
