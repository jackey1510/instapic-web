import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
  });
});
