import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PhotoWidget from "../../src/components/PhotoWidget";
import { PostDto } from "../../src/dto/response/post.dto";

describe("PhotoModal", () => {
  let post: PostDto = {
    createdAt: new Date(),
    fileName: "file",
    text: "text",
    updatedAt: new Date(),
    username: "user",
  };
  it("renders", () => {
    render(
      <PhotoWidget post={post} height={300} maxWidth={300} minWidth={300} />
    );
    const photoWidget = screen.getByTestId("photoWidget");
    expect(photoWidget).toBeDefined();
    expect(screen.getByText("user")).toBeDefined();
    expect(screen.getByText("text")).toBeDefined();
  });

  it("click widget to show modal", () => {
    render(
      <PhotoWidget post={post} height={300} maxWidth={300} minWidth={300} />
    );
    const photoWidget = screen.getByTestId("photoWidget");
    fireEvent.click(photoWidget);
    expect(screen.getByTestId("photoModal")).toBeDefined();
  });
});
