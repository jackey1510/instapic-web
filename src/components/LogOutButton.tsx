import { Button } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import router from "next/dist/client/router";
import React from "react";
import { UseMutateAsyncFunction } from "react-query";
import { queryClient } from "../pages/_app";

interface LogOutButtonInterface {
  logout: UseMutateAsyncFunction<
    void | AxiosResponse<any>,
    unknown,
    void,
    unknown
  >;
  isLoading: boolean;
}

export const LogOutButton: React.FC<LogOutButtonInterface> = ({
  logout,
  isLoading,
}) => {
  return (
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
  );
};
