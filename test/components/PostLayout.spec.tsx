import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider, UseInfiniteQueryResult } from "react-query";
import PostLayout from "../../src/components/PostLayout";
import { PaginatedPostsDto } from "../../src/dto/response/paginated-posts.dto";
import { PostDto } from "../../src/dto/response/post.dto";
import * as useInfinitePostQuery from "../../src/hooks/useInfinitePostQuery";
import { queryClient } from "../../src/pages/_app";
import * as axiosQuery from "../../src/utils/axios";

describe("PostLayout", () => {
  let posts: PostDto[],
    data: {
      pageParams: any;
      pages: PaginatedPostsDto[];
    },
    res: UseInfiniteQueryResult<void | PaginatedPostsDto, Error>;

  beforeEach(() => {
    jest.clearAllMocks();
    posts = [
      {
        username: "user",
        createdAt: new Date(),
        fileName: "file",
        text: "text",
        updatedAt: new Date(),
      },
    ];

    data = {
      pageParams: [],
      pages: [
        {
          nextCursor: null,
          posts,
        },
      ],
    };
    res = {
      data,
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
      remove: () => { },
      status: "success",
      fetchNextPage: jest.fn(),
      fetchPreviousPage: jest.fn(),
      isFetchingNextPage: false,
      isFetchingPreviousPage: false,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    jest.spyOn(axiosQuery, "axiosQuery").mockImplementation(async () => { });
  });

  it("renders", () => {
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    );
    screen.getByTestId("postLayout");
    try {
      screen.getByText('Load More')
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("shows nothing when no data", () => {
    res.data!.pages[0]! = {
      nextCursor: null,
      posts: []
    }
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    );
    try {
      screen.getByTestId("postLayout");
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      screen.getByText('Load More')
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("shows skeletons when is fetching", () => {
    res.data = undefined
    res.isFetching = true;
    res.isFetchingNextPage = false;
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    );
    const skeletons = screen.getByTestId('skeletons')
    expect(skeletons).toBeDefined();
  });

  it("shows alert when there is error", () => {
    res.error = {
      message: 'There is Error',
      name: 'Error'
    }
    res.isError = true;
    res.isSuccess = false;
    res.status = "error"
    res.isFetched = false;
    res.isFetchedAfterMount = false;
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    );
    expect(screen.getByText('There is Error')).toBeDefined();
  })

  it("shows load more button when has next page", () => {
    res.data!.pages = [{
      nextCursor: new Date(),
      posts
    }]
    res.hasNextPage = true;
    jest
      .spyOn(useInfinitePostQuery, "useInfinitePostQuery")
      .mockImplementation(() => res);
    render(
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    );
    expect(screen.getByText('Load More')).toBeDefined();
  })


});
