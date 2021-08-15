import { Button } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { act } from "react-dom/test-utils";
import InputSwitch from "../../src/components/InputSwitch";

describe("InputField", () => {
  beforeEach(() => {});

  it("renders", () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputSwitch label="switch" name="switch" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );

    expect(screen.getByTestId("inputSwitch")).toBeDefined();
    expect(screen.getByText("switch")).toBeDefined();
  });

  it("set the values on submit", async () => {
    let result: boolean;
    render(
      <Formik
        initialValues={{ switch: false }}
        onSubmit={(values: { switch: boolean }) => {
          result = values.switch;
        }}
      >
        <Form>
          <InputSwitch label="switch" name="switch" />
          <Button type="submit">submit</Button>
        </Form>
      </Formik>
    );
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(screen.getByRole("checkbox"));
        fireEvent.click(screen.getByRole("button"));
        expect(result).toEqual(true);
      });
    });
  });
});
