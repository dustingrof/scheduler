import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      const currentHistory = [...history];
      currentHistory.pop();
      setHistory([...currentHistory, mode]);
    } else {
      setHistory([...history, mode]);
    }
    setMode(mode);
  };

  const back = () => {
    if (history.length > 1) {
      const currentHistory = [...history];
      currentHistory.pop();
      setMode(currentHistory[currentHistory.length - 1]);
      setHistory(currentHistory);
    }
  };

  return { mode, transition, back };
}