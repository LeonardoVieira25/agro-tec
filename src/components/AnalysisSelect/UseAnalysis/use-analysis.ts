import { useState } from "react";

export function useAnalysis() {
  const [analysis, setAnalysis] = useState<string | null>(null);

  return {
    analysis,
    setAnalysis,
  };
}
