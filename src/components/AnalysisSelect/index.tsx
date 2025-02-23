"use client";
import { Box, Typography } from "@mui/material";
import { AnalysisForm } from "./analysisform";
import { useAnalysis } from "./UseAnalysis/use-analysis";

export function AnalysisSelect() {
  useAnalysis();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          mb: "1rem",
          textAlign: "center",
        }}
      >
        Dados para Análise
      </Typography>
      <AnalysisForm />
    </Box>
  );
}
