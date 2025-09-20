import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Terminal from "../about/MockLinux";

jest.useFakeTimers();

describe("Terminal", () => {
  it("should render without crashing", () => {
    render(<Terminal />);
  });

  it("should type out all commands, outputs and links", () => {
    render(<Terminal disableAnimations />);

    expect(screen.getByText(/cat Resume.md/)).toBeInTheDocument();
    const links = screen.getAllByText("Click Here");
    expect(links).toHaveLength(2);
  });

  it("should clear timeouts on unmount", () => {
    const { unmount } = render(<Terminal />);
    act(() => {
        jest.runOnlyPendingTimers();
    });
    unmount();
  });
});