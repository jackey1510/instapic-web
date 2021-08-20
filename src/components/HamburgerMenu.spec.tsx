import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryObserverResult } from "react-query";
import HamburgerMenu from "../../src/components/HamburgerMenu";
import { UserDto } from "../../src/dto/response/user.dto";
import * as useMeQuery from "../../src/hooks/useMeQuery";
import { queryClient } from "../../src/pages/_app";
import * as axiosQuery from "../../src/utils/axios";
describe("HamburgerMenu", () => {
  let hamburgerMenu: HTMLElement;
  let res: QueryObserverResult<void | UserDto>;
  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      data: undefined,
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
    };
    jest.spyOn(axiosQuery, "axiosQuery").mockImplementation(async () => {});
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => res);
  });
  it("renders", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
      </QueryClientProvider>
    );
    hamburgerMenu = screen.getByTestId("hamburgerMenu");
    expect(hamburgerMenu).toBeDefined();
  });

  it("shows login and register button when not logged in", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
      </QueryClientProvider>
    );

    expect(useMeQuery.useMeQuery).toBeCalled();
    fireEvent.click(screen.getByRole("button"));
    const login = screen.getByText("Login");
    expect(login).toBeDefined();
    const register = screen.getByText("Register");
    expect(register).toBeDefined();
  });

  it("shows create post and logout when signed in", async () => {
    res.data = { bio: "bio", email: "abc@email.com", username: "username" };
    render(
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
      </QueryClientProvider>
    );
    expect(useMeQuery.useMeQuery).toBeCalled();
    fireEvent.click(screen.getByRole("button"));
    const createPost = screen.getByText("Create Post");
    expect(createPost).toBeDefined();
    const signOut = screen.getByText("Sign Out");
    expect(signOut).toBeDefined();
  });
});
