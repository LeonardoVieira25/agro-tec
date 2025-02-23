import { useState } from "react";

export function useSubmission() {
  const [submission, setSubmission] = useState<string | null>(null);

  return {
    submission,
    setSubmission,
  };
}
