import { Button } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { act } from "react-dom/test-utils";
import InputField from "../../src/components/InputField";

describe("InputField", () => {
  beforeEach(() => {});

  it("renders", () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputField label="text" name="text" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );

    expect(screen.getByTestId("inputField")).toBeDefined();
    expect(screen.getByText("text")).toBeDefined();
  });

  it("raise error when there is no input", async () => {
    render(
      <Formik
        initialValues={{}}
        onSubmit={(_, { setErrors }) => {
          setErrors({
            text: "error",
          });
        }}
      >
        <Form>
          <InputField label="text" name="text" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
      const errorMessage = await screen.findByTestId("formErrorMessage");
      expect(errorMessage).toBeDefined();
      expect(errorMessage.textContent).toEqual("error");
    });
  });

  it("set the values on submit", async () => {
    let result: string;
    render(
      <Formik
        initialValues={{ text: "" }}
        onSubmit={(values: { text: string }) => {
          result = values.text;
        }}
      >
        <Form>
          <InputField label="text" name="text" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    await act(async () => {
      await waitFor(() => {
        fireEvent.change(screen.getByTestId("inputText"), {
          target: { value: "something" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(result).toEqual("something");
      });
    });
  });
});
