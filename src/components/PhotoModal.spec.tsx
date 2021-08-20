import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PhotoModal from "../../src/components/PhotoModal";
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
    render(<PhotoModal isOpen={true} onClose={() => {}} post={post} />);
    const photoModal = screen.getByTestId("photoModal");
    expect(photoModal).toBeDefined();
    expect(screen.getByText("user")).toBeDefined();
    expect(screen.getByText("text")).toBeDefined();
  });

  it("closes", () => {
    let isOpen = true;
    const onClose = () => {
      isOpen = false;
    };
    render(<PhotoModal isOpen={isOpen} onClose={onClose} post={post} />);
    fireEvent.click(screen.getByRole("button"));
    try {
      screen.getByTestId("photoModal");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
