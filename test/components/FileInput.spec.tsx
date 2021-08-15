import { Button } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import FileInput from "../../src/components/FileInput";

describe("FileInput", () => {
  let mockFile: File | null;
  const setInputFile = (file: File) => {
    mockFile = file;
  };
  beforeEach(() => {
    mockFile = null;
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <FileInput label="label" name="name" setInputFile={setInputFile} />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
  });
  it("should be rendered", () => {
    const { getByTestId, getByText } = screen;
    expect(getByTestId("fileInput")).toBeDefined();
    expect(getByText("label")).toBeDefined();
  });

  it("should be able to set upload file", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    const fileSelect = screen.getByTestId("fileSelect");
    await waitFor(() => {
      fireEvent.change(fileSelect, {
        target: {
          files: [file],
        },
      });
    });
    expect(file).toEqual(mockFile);
  });

  it("should raise error when not file is selected", async () => {
    const submitButton = await screen.findByText("submit");

    waitFor(() => {
      fireEvent.click(submitButton);
      const label = screen.getByText("label") as HTMLLabelElement;
      expect(label).toHaveAttribute("data-focus");
    });
  });
});
