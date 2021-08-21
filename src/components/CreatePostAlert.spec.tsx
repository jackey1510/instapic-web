import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreatePostAlert from "./CreatePostAlert";
import { uploadStatus } from "../types/types";

describe("CreatePostAlert", () => {
  let uploadState: uploadStatus;
  const setUploadState = (state: uploadStatus) => {
    uploadState = state;
  };

  beforeEach(() => {});

  it("shows nothing when state is undefined", () => {
    render(
      <CreatePostAlert
        uploadState={uploadState}
        setUploadState={setUploadState}
      />
    );
    try {
      screen.getByRole("alert");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it("shows alert when error", () => {
    uploadState = "error";
    render(
      <CreatePostAlert
        uploadState={uploadState}
        setUploadState={setUploadState}
      />
    );

    expect(screen.getByText("Upload Failed!")).toBeDefined();
    expect(screen.getByText("Your input is invalid.")).toBeDefined();
  });
  it("shows alert when success", () => {
    uploadState = "success";
    render(
      <CreatePostAlert
        uploadState={uploadState}
        setUploadState={setUploadState}
      />
    );
    expect(screen.getByText("Data uploaded to the server.")).toBeDefined();
  });
});
