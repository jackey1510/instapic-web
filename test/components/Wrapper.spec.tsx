import React from "react";
import { render, screen } from "@testing-library/react";
import Wrapper from "../../src/components/Wrapper";
import "@testing-library/jest-dom";

describe("Wrapper", () => {
  it("should be defined", () => {
    render(<Wrapper>Wrapper</Wrapper>);
    const wrapper = screen.getByText("Wrapper");
    expect(wrapper).toBeDefined();
  });
});
