import React from "react";
import { render, screen, act } from "@testing-library/react";
import MockLinux from "../MockLinux";
import { TerminalProvider } from "../../context/TerminalContext";

jest.useFakeTimers();

describe("MockLinux", () => {
  it("should render without crashing", () => {
    render(
      <TerminalProvider>
        <MockLinux />
      </TerminalProvider>
    );
  });

  it("should type out all commands, outputs and links", () => {
    render(
      <TerminalProvider>
        <MockLinux disableAnimations />
      </TerminalProvider>
    );

    expect(screen.getByText(/cat Resume.md/)).toBeInTheDocument();
    const links = screen.getAllByText("Click Here");
    expect(links).toHaveLength(2);
  });

  it("should clear timeouts on unmount", () => {
    const { unmount } = render(
      <TerminalProvider>
        <MockLinux />
      </TerminalProvider>
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });
    unmount();
  });
});