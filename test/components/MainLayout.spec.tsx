import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { MainLayout } from "../../src/components/MainLayout";
import { queryClient } from "../../src/pages/_app";

describe("MainLayout", () => {
  beforeEach(() => {});

  it("renders", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MainLayout variant="large" />
      </QueryClientProvider>
    );
    const mainLayout = screen.getByTestId("mainLayout");
    expect(mainLayout).toBeDefined();
  });
});
