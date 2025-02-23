"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import { NumberField } from "./NumberField";
import { useAnalysisForm } from "./UseAnalysis/use-analysis-form";
import { Upload } from "@mui/icons-material";

export function AnalysisForm() {
  const { formData, handleChange, handleSubmit } = useAnalysisForm();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 5,
        p: 6,
        maxWidth: "auto",
        mx: "auto",
        fontFamily: "Arial, sans-serif", // Definindo a fonte padrão do projeto
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <Typography variant="h6" textAlign="center" mb={2}>
          Dados para Análise
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
              borderColor: "#428C5C",
              borderRadius: 2,
              py: 1,
              mb: 4,
              cursor: "pointer",
              gap: "10px",
              width: "50%",
            }}
          >
            <Typography fontWeight="medium">Arquivo</Typography>
            <Upload />
          </Box>
        </div>

        {/* Campos Numéricos */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mb: 4,
          }}
        >
          {[
            { label: "Temperatura Máxima", key: "tempMax" },
            { label: "Temperatura Mínima", key: "tempMin" },
            { label: "Precipitação Max", key: "precipMax" },
            { label: "Precipitação Min", key: "precipMin" },
            { label: "Evaporação Máxima", key: "evapMax" },
            { label: "Evaporação Mínima", key: "evapMin" },
            { label: "Déficit Hídrico Max", key: "deficitMax" },
            { label: "Déficit Hídrico Min", key: "deficitMin" },
            { label: "Dias sem chuva", key: "diasSemChuva" },
            { label: "Temperatura máxima para avaliação", key: "tempAcimaX" },
            {
              label: "Quantidade de dias acima da temperatura",
              key: "diasAcimaX",
            },
          ].map(({ label, key }) => (
            <NumberField
              key={key}
              label={label}
              value={formData[key]}
              onChange={(value) => handleChange(key, value)}
              sx={{
                margin: "8px 0", // Adicionando margem aos inputs
                "& input": {
                  fontFamily: "Arial, sans-serif", // Definindo a fonte dos inputs
                },
                "& button": {
                  color: "green", // Estilizando os botões de incremento e decremento
                },
              }}
            />
          ))}
        </Box>

        {/* Inputs de Texto */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Tipo de Cultura
            </Typography>
            <Input
              type="text"
              value={formData.tipoCultura}
              onChange={(e) => handleChange("tipoCultura", e.target.value)}
              placeholder="Ex: Milho"
              sx={{
                px: 2,
                py: 1.5,
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 1,
                margin: "8px 0", // Adicionando margem aos inputs
                fontFamily: "Arial, sans-serif", // Definindo a fonte dos inputs
                "&:hover": {
                  borderColor: "green", // Cor da borda ao passar o mouse
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Porcentagem de aumento de preço
            </Typography>
            <Input
              type="text"
              value={formData.porcentagemAumento}
              onChange={(e) =>
                handleChange("porcentagemAumento", e.target.value)
              }
              placeholder="Ex: 5.5"
              sx={{
                px: 2,
                py: 1.5,
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 1,
                margin: "8px 0", // Adicionando margem aos inputs
                fontFamily: "Arial, sans-serif", // Definindo a fonte dos inputs
                "&:hover": {
                  borderColor: "green", // Cor da borda ao passar o mouse
                },
              }}
            />
          </Box>
        </Box>

        {/* Botão de Envio */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontFamily: "Arial, sans-serif", // Definindo a fonte do botão
            }}
          >
            Analisar Dados
          </Button>
        </Box>
      </form>
    </Box>
  );
}
