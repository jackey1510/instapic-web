import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryObserverResult } from "react-query";
import Home from "../../src/components/Home";
import { UserDto } from "../../src/dto/response/user.dto";
import * as useInfinitePostQuery from "../../src/hooks/useInfinitePostQuery";
import * as useMeQuery from "../../src/hooks/useMeQuery";
import * as axiosQuery from "../../src/utils/axios";

describe("Home", () => {
  let res: QueryObserverResult<void | UserDto>;
  beforeEach(() => {
    res = {
      data: undefined,
      isFetching: true,
      isError: false,
      dataUpdatedAt: 1,
      error: null,
      errorUpdatedAt: 0,
      failureCount: 0,
      isFetched: false,
      isFetchedAfterMount: false,
      isIdle: false,
      isLoading: true,
      isLoadingError: false,
      isPlaceholderData: false,
      isPreviousData: false,
      isRefetchError: false,
      isStale: false,
      isSuccess: false,
      refetch: jest.fn(),
      remove: () => {},
      status: "loading",
    };
  });
  it("shows spinner when fetching", () => {
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => {
      return res;
    });
    render(<Home />);
    expect(screen.getByTestId("spinner")).toBeDefined();
  });

  it("shows tells user to login when not logged in", () => {
    res.isFetching = false;
    res.isFetched = true;
    res.isLoading = false;
    res.isSuccess = true;
    res.status = "success";
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => {
      return res;
    });
    render(<Home />);
    expect(
      screen.getByText("Login to browse all amazing photos!")
    ).toBeDefined();
  });

  it("shows posts when logged in", () => {
    res.isFetching = false;
    res.isFetched = true;
    res.isLoading = false;
    res.isSuccess = true;
    res.status = "success";
    res.data = {
      bio: "bio",
      email: "user@email.com",
      username: "user",
    };
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => {
      return res;
    });
    jest.spyOn(axiosQuery, "axiosQuery").mockImplementation(async () => {});
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => {
        return {
          data: {
            pageParams: [],
            pages: [
              {
                nextCursor: null,
                posts: [
                  {
                    username: "user",
                    createdAt: new Date(),
                    fileName: "file",
                    text: "text",
                    updatedAt: new Date(),
                  },
                ],
              },
            ],
          },
          isFetching: false,
          isError: false,
          dataUpdatedAt: 1,
          error: null,
          errorUpdatedAt: 0,
          failureCount: 0,
          isFetched: true,
          isFetchedAfterMount: true,
          isIdle: false,
          isLoading: false,
          isLoadingError: false,
          isPlaceholderData: false,
          isPreviousData: false,
          isRefetchError: false,
          isStale: false,
          isSuccess: true,
          refetch: jest.fn(),
          remove: () => {},
          status: "success",
          fetchNextPage: jest.fn(),
          fetchPreviousPage: jest.fn(),
          isFetchingNextPage: false,
          isFetchingPreviousPage: false,
          hasNextPage: false,
          hasPreviousPage: false,
        };
      });
    render(<Home />);
    expect(screen.getByTestId("postLayout")).toBeDefined();
  });
});
