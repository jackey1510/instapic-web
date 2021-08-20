
import { render, screen } from "@testing-library/react";
import Wrapper from "../../src/components/Wrapper";
import "@testing-library/jest-dom";

describe("Wrapper", () => {
  it("should be defined", () => {
    render(<Wrapper>Wrapper</Wrapper>);
    const wrapper = screen.getByText("Wrapper");
    expect(wrapper).toBeDefined();

  });
  it('maxWidth should be 400 for small', () => {
    render(<Wrapper variant='small'></Wrapper>);
    const inner = screen.getByTestId('wrapper');
    expect(window.getComputedStyle(inner).maxWidth).toEqual('400px')
  })
  it('maxWidth should be 800 for regular', () => {
    render(<Wrapper variant='regular'></Wrapper>);
    const inner = screen.getByTestId('wrapper');
    expect(window.getComputedStyle(inner).maxWidth).toEqual('800px')
  })
  it('maxWidth should be 1000 for regular', () => {
    render(<Wrapper variant='large'></Wrapper>);
    const inner = screen.getByTestId('wrapper');
    expect(window.getComputedStyle(inner).maxWidth).toEqual('1000px')
  })
});
