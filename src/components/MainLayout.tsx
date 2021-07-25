import React from "react";
import NavBar from "./NavBar";
import Wrapper, { WrapperProps } from "./Wrapper";

interface MainLayoutProps extends WrapperProps { }

export async function getServerSideProps() {

}

export const MainLayout: React.FC<MainLayoutProps> = ({
  variant,
  children,
}) => {

  return (
    <>
      <NavBar />
      <Wrapper variant={variant} >{children}</Wrapper>
    </>
  );
};
