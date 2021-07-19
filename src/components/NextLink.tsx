import React from "react";
import NLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";

interface NextLinkProps extends LinkProps {
  href: string;
  // body: any;
}

export const NextLink: React.FC<NextLinkProps> = ({ href, children, as, ...props }) => {
  return (
    <NLink href={href} >
      <Link {...props}>{children}</Link>
    </NLink>
  );
};
export default NextLink;
