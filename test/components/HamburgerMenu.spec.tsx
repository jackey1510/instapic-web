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
      refetch: async () => {
        const a: any = "";
        return a;
      },
      remove: () => {},
      status: "success",
    };
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
    // jest.spyOn(query, 'getProfileQuery').mockImplementation(async () => res)
    jest.spyOn(axiosQuery, "axiosQuery").mockImplementation(async () => {});
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
      </QueryClientProvider>
    );

    expect(useMeQuery.useMeQuery).toBeCalled();
    fireEvent.click(screen.getByRole("button"));
    const login = screen.getByText("Login");
    expect(login).toBeDefined();
    // expect((login.parentElement as HTMLLinkElement).href).toEqual("/login");
    const register = screen.getByText("Register");
    expect(register).toBeDefined();
    // expect((register.parentElement as HTMLLinkElement).href).toEqual(
    //   "/register"
    // );
  });

  it("shows create post and logout when signed in", async () => {
    res.data = { bio: "bio", email: "abc@email.com", username: "username" };
    jest.spyOn(axiosQuery, "axiosQuery").mockImplementation(async () => {});
    jest.spyOn(useMeQuery, "useMeQuery").mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <HamburgerMenu />
      </QueryClientProvider>
    );
    expect(useMeQuery.useMeQuery).toBeCalled();
    fireEvent.click(screen.getByRole("button"));
    const createPost = screen.getByText("Create Post");
    expect(createPost).toBeDefined();
    // expect((createPost.parentElement as HTMLLinkElement).href).toEqual(
    //   "/create-post"
    // );
    const signOut = screen.getByText("Sign Out");
    expect(signOut).toBeDefined();
  });
});
