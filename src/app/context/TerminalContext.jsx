"use client"
import { createContext, use, useContext, useEffect, useState } from "react";

const TerminalContext = createContext();

export const useTerminal = () => useContext(TerminalContext);

export const TerminalProvider = ({ children }) => {
  const [terminalLoadAll, setTerminalLoadAll] = useState(false);

  const loadAllTerminalContent = () => {
    setTerminalLoadAll(true);
  }

  return (
    <TerminalContext.Provider value={{ terminalLoadAll, loadAllTerminalContent }}>
      {children}
    </TerminalContext.Provider>
  )
}
