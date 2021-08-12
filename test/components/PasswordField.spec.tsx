import { Button } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { act } from "react-dom/test-utils";
import PasswordField from "../../src/components/PasswordField";

describe("PasswordField", () => {
  beforeEach(() => {});

  it("renders", () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <PasswordField label="password" name="password" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );

    expect(screen.getByTestId("passwordField")).toBeDefined();
    expect(screen.getByText("password")).toBeDefined();
  });

  it("raise error when there is no input", async () => {
    render(
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(values, { setErrors }) => {
          if (!values.password) {
            setErrors({
              password: "error",
            });
          }
        }}
      >
        <Form>
          <PasswordField label="password" name="password" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
      const errorMessage = await screen.findByTestId("formErrorMessage");
      expect(errorMessage).toBeDefined();
      expect(errorMessage.textContent).toEqual("error");
    });
  });

  it("set the values on submit", async () => {
    let result: string;
    render(
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(values: { password: string }) => {
          result = values.password;
        }}
      >
        <Form>
          <PasswordField label="password" name="password" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    await act(async () => {
      await waitFor(() => {
        fireEvent.change(screen.getByTestId("passwordInput"), {
          target: { value: "something" },
        });
        fireEvent.click(screen.getByText("submit"));
        expect(result).toEqual("something");
      });
    });
  });
  it("hide/show password", async () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <PasswordField label="password" name="password" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    const passwordInput = screen.getByTestId(
      "passwordInput"
    ) as HTMLInputElement;
    expect(passwordInput.type).toEqual("password");

    fireEvent.click(screen.getByText("Show"));
    expect(passwordInput.type).toEqual("text");
  });
});
