
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DarkModeSwitch from "../../src/components/DarkModeSwitch";
import * as chakra from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/react";

describe("DarkModeSwitch", () => {
  let element: HTMLElement, toggle: HTMLElement, icon: HTMLElement
  beforeEach(() => {
    render(<ColorModeProvider options={
      { useSystemColorMode: true }
    }><DarkModeSwitch /></ColorModeProvider>);
    element = screen.getByTestId('darkModeSwitch')
    toggle = screen.getByTestId('darkModeToggle');
    icon = screen.getByTestId('darkModeNightIcon');
  })
  it("should be defined", () => {

    expect(element).toBeDefined();
    expect(toggle).toBeDefined();
    expect(icon).toBeDefined();
  });
  it('should change mode', async () => {

    jest.spyOn(chakra, 'useColorMode');
    const dmSwitch = screen.getByRole('checkbox') as HTMLInputElement;
    // fireEvent.click(toggle)
    expect(dmSwitch.checked).toBeFalsy();
    fireEvent.click(dmSwitch)
    await waitFor(() => {
      expect(chakra.useColorMode).toBeCalled();
      expect(dmSwitch.checked).toBeTruthy();
      expect(screen.getByTestId('darkModeDayIcon')).toBeDefined()
    })
  })
});
