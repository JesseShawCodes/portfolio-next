import React, { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import MockLinux from "../MockLinux";
import { TerminalProvider, useTerminal } from "../../context/TerminalContext";
import { getLocale } from "../../../config/locale";

jest.mock("../ProgressBar", () => {
  return function MockProgressBar() {
    return <div data-testid="mock-progress-bar" />;
  };
});

jest.useFakeTimers();

const aboutMeLines = getLocale().about.terminal.lines;

function advanceTerminalAnimation() {
  let steps = 0;
  for (const line of aboutMeLines) {
    steps += line.command.length + 1;
    if (line.output) {
      steps += line.output.length;
    }
  }
  for (let i = 0; i < steps; i++) {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  }
}

function TerminalLoadAllTrigger() {
  const { loadAllTerminalContent } = useTerminal();
  useEffect(() => {
    loadAllTerminalContent();
  }, [loadAllTerminalContent]);
  return <MockLinux />;
}

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

  it("should load all terminal lines when terminalLoadAll is enabled", () => {
    render(
      <TerminalProvider>
        <TerminalLoadAllTrigger />
      </TerminalProvider>
    );

    expect(screen.getByText(/cat Resume.md/)).toBeInTheDocument();
    const links = screen.getAllByText("Click Here");
    expect(links).toHaveLength(2);
  });

  it("should animate typing through all lines and show the final cursor", () => {
    const { container } = render(
      <TerminalProvider>
        <MockLinux />
      </TerminalProvider>
    );

    advanceTerminalAnimation();

    expect(screen.getByText(/cat Resume.md/)).toBeInTheDocument();
    expect(container.querySelector(".terminal-mock .blinking-cursor")).toBeInTheDocument();
  });

  it("skips output updates when the current line entry is missing", () => {
    jest.isolateModules(() => {
      jest.doMock("../../../config/locale", () => ({
        getLocale: () => ({
          about: {
            terminal: {
              progressLabel: "Loading",
              linkText: "Click",
              lines: [{ command: "", output: "hi" }],
            },
          },
        }),
      }));

      const IsolatedMockLinux = require("../MockLinux").default;

      render(
        <TerminalProvider>
          <IsolatedMockLinux />
        </TerminalProvider>
      );

      act(() => {
        jest.runOnlyPendingTimers();
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(screen.getByText("hi")).toBeInTheDocument();
    });
  });
});