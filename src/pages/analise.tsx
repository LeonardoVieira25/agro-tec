import React from "react";
import Layout from "../components/Layout/Index";
import { Box, Button, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface AnaliseDataType {
  temperatura: { [key: string]: number | null };
  precipitacao: { [key: string]: number | null };
  evapotranspiracao: { [key: string]: number | null };
  deficitHidrico: { [key: string]: number | null };
  custo: { [key: string]: number | null };
  condition: { [key: string]: boolean };
  sequence_condition: { [key: string]: number | null };
  no_rain: { [key: string]: boolean };
  no_rain_group: { [key: string]: number | null };
  price_diff: { [key: string]: number | null };
  price_increase: { [key: string]: boolean };
}

function AnaliseDataTypeToDta(data: AnaliseDataType) {
  const dta = Object.keys(data.temperatura).map((key) => {
    return {
      data: key,
      temperatura: data.temperatura[key],
      precipitacao: data.precipitacao[key],
      evapotranspiracao: data.evapotranspiracao[key],
      deficitHidrico: data.deficitHidrico[key],
      custo: data.custo[key],
    };
  });
  return dta;
}

// Exemplo de dados (substituir pelo CSV processado)
// const data = [
//   {
//     data: '01/01',
//     temperatura: 25,
//     precipitacao: 20,
//     evapotranspiracao: 22.5,
//     deficitHidrico: -5,
//     custo: 25,
//   },
//   {
//     data: '02/01',
//     temperatura: 28,
//     precipitacao: 10,
//     evapotranspiracao: 24.0,
//     deficitHidrico: 5,
//     custo: 30,
//   },
//   {
//     data: '03/01',
//     temperatura: 30,
//     precipitacao: 50,
//     evapotranspiracao: 26.5,
//     deficitHidrico: 20,
//     custo: 40,
//   },
//   {
//     data: '04/01',
//     temperatura: 32,
//     precipitacao: 0,
//     evapotranspiracao: 28.0,
//     deficitHidrico: 10,
//     custo: 35,
//   },
//   {
//     data: '05/01',
//     temperatura: 29,
//     precipitacao: 15,
//     evapotranspiracao: 23.0,
//     deficitHidrico: -2,
//     custo: 20,
//   },
// ];

// const dataCost = [
//   { temperatura: 25, custo: 25 },
//   { temperatura: 28, custo: 30 },
//   { temperatura: 30, custo: 40 },
//   { temperatura: 32, custo: 35 },
//   { temperatura: 29, custo: 20 },
// ];

function numberFormatter(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ResumoAnalise({ analiseData }: { analiseData: AnaliseDataType }) {
  const data = AnaliseDataTypeToDta(analiseData);

  const temperaturaMedia = (
    data.reduce((sum, item) => sum + (item?.temperatura || 0), 0) / data.length
  ).toFixed(2);
  const precipitacaoTotal = data.reduce(
    (sum, item) => sum + (item?.precipitacao || 0),
    0
  );
  const deficitHidricoTotal = data.reduce(
    (sum, item) => sum + (item?.deficitHidrico || 0),
    0
  );
  const custoTotal = numberFormatter(
    data.reduce((sum, item) => sum + (item?.custo || 0), 0)
  );

  return (
    <Box
      sx={{
        my: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Resumo da Análise
      </Typography>
      <Typography>Temperatura Média: {temperaturaMedia}°C</Typography>
      <Typography>Precipitação Total: {precipitacaoTotal} mm</Typography>
      <Typography>Déficit Hídrico Total: {deficitHidricoTotal} mm</Typography>
      <Typography>Custo Total: {custoTotal}</Typography>
    </Box>
  );
}

function ConclusaoAnalise({ analiseData }: { analiseData: AnaliseDataType }) {
  const data = AnaliseDataTypeToDta(analiseData);
  return (
    <Box
      sx={{
        my: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Conclusão da Análise
      </Typography>
      <Typography>
        A análise dos dados coletados revela padrões importantes para o manejo
        da plantação. A temperatura média registrada foi de{" "}
        {data.reduce((sum, item) => sum + (item?.temperatura || 0), 0) /
          data.length}
        °C, enquanto a precipitação total acumulada no período foi de{" "}
        {data.reduce((sum, item) => sum + (item?.precipitacao || 0), 0)} mm.
        Esses fatores influenciam diretamente a evapotranspiração, que
        apresentou valores médios de{" "}
        {data.reduce((sum, item) => sum + (item?.evapotranspiracao || 0), 0) /
          data.length}{" "}
        mm, impactando a disponibilidade hídrica para as culturas.
      </Typography>
      <Typography>
        O déficit hídrico observado indica a necessidade de estratégias de
        irrigação para evitar prejuízos na produção. Além disso, o custo total
        estimado para as operações no período foi de{" "}
        {numberFormatter(
          data.reduce((sum, item) => sum + (item?.custo || 0), 0)
        )}
        , reforçando a importância de um planejamento eficiente para otimizar
        recursos e maximizar a produtividade.
      </Typography>
    </Box>
  );
}

function AnalisePage({ analiseData }: { analiseData: AnaliseDataType }) {
  const data = AnaliseDataTypeToDta(analiseData);
  return (
    <Layout>
      <Box sx={{ py: 10, width: "100%", px: 3, fontFamily: "Inter" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "24px",
            color: "#1e1e1e",
            fontWeight: "600",
            textAlign: "left",
            mb: 5,
          }}
        >
          Resultado da Análise
        </Typography>

        <ResumoAnalise analiseData={analiseData} />

        {/* Gráficos superiores (3 em linha) */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ width: "33%" }}>
            <Typography sx={{ textAlign: "left", mb: 2 }}>
              Temperatura e Precipitação
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperatura" stroke="#ff7300" />
                <Line type="monotone" dataKey="precipitacao" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: "33%" }}>
            <Typography sx={{ textAlign: "left", mb: 2 }}>
              Déficit Hídrico
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deficitHidrico" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ width: "33%" }}>
            <Typography sx={{ textAlign: "left", mb: 2 }}>
              Custo de Produção
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="custo"
                  nameKey="data"
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Gráficos inferiores (2 em grid) */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ textAlign: "left", mb: 2 }}>
              Temperatura e Precipitação
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis dataKey="temperatura" name="Temperatura" />
                <YAxis dataKey="precipitacao" name="Precipitação" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Clima" data={data} fill="#ff7300" />
              </ScatterChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ textAlign: "left", mb: 2 }}>
              Evapotranspiração
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="data" />
                <PolarRadiusAxis />
                <Radar
                  name="Evapotranspiração"
                  dataKey="evapotranspiracao"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box sx={{ width: "100%", mt: 5 }}>
          <Typography sx={{ textAlign: "left", mb: 2 }}>
            Custo de Produção x Temperatura
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="temperatura"
                name="Temperatura (°C)"
                unit="°C"
              />
              <YAxis type="number" dataKey="custo" name="Custo" unit="R$" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Análise" data={dataCost} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>

        <ConclusaoAnalise />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#428C5C",
            "&:hover": { backgroundColor: "#277357" },
            color: "white",
            px: 8,
            my: 5,
          }}
          href="/analysisform"
        >
          ANALISAR OUTROS DADOS
        </Button>
      </Box>
    </Layout>
  );
}

export default AnalisePage;
