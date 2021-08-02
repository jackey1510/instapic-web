import React from "react";
import { render, screen } from "@testing-library/react";
import Wrapper from "../src/components/Wrapper";
import "@testing-library/jest-dom";
// let container: any = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });
// import dynamic from "next/dynamic";

/**
 * @jest-environment jsdom
 */
test("renders with or without a name", () => {
  render(<Wrapper data-testid="wrapper" />);
  const wrapper = screen.getByTestId("wrapper");
  expect(wrapper).toBeDefined();
});
