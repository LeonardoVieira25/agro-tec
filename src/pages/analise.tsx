import { Box, Button, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

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
  if (!data.temperatura) return [];

  const timestamps = Object.keys(data.temperatura);
  const sortedTimestamps = timestamps.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const dta = sortedTimestamps.map((timestamp) => {
    const date = new Date(Number(timestamp));
    const keys = Object.keys(data);
    const dateToReturn: any = [];
    keys.forEach((key) => {
      dateToReturn[key] = data[key as keyof AnaliseDataType][timestamp];
    });
    dateToReturn.date = date;

    return dateToReturn;
  });
  return dta;
}

function numberFormatter(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ResumoAnalise({ analiseData }: { analiseData: AnaliseDataType }) {
  console.log(analiseData);
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
              <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                dy={5}
                minTickGap={20}
                tickFormatter={(value) => format(value, "MM/yyyy")}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
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
              <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                dy={5}
                minTickGap={20}
                tickFormatter={(value) => format(value, "MM/yyyy")}
              />

              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                dy={5}
                minTickGap={20}
                tickFormatter={(value) => format(value, "MM/yyyy")}
              />

              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
              <Legend />
              <Line type="monotone" dataKey="custo" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>

          {/* <PieChart>
                <Pie
                  data={data}
                  dataKey="custo"
                  nameKey="data"
                  fill="#82ca9d"
                  label
                />
                <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
              </PieChart> */}
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

          {/* <RadarChart data={data} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="date" />
                <PolarRadiusAxis />
                <Radar
                  name="Evapotranspiração"
                  dataKey="evapotranspiracao"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
              </RadarChart> */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                dy={5}
                minTickGap={20}
                tickFormatter={(value) => format(value, "MM/yyyy")}
              />

              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="evapotranspiracao"
                stroke="#ff7300"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Typography sx={{ textAlign: "left", mb: 2 }}>
          Custo de Produção x Temperatura
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="date"
                interval={"equidistantPreserveStart"}
                dy={5}
                minTickGap={20}
                tickFormatter={(value) => format(value, "MM/yyyy")}
              />

            <YAxis />
            <Tooltip 
                labelFormatter={(value) => format(value, "dd/MM/yyyy")}
              />
            <Legend />
            <Line type="monotone" dataKey="temperatura" stroke="#ff7300" />
            <Line type="monotone" dataKey="custo" stroke="#ff73ff" />
          </LineChart>
        </ResponsiveContainer>

        {/* <ResponsiveContainer width="100%" height={300}>
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
          </ResponsiveContainer> */}
      </Box>

      <ConclusaoAnalise analiseData={analiseData} />
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
  );
}

export default AnalisePage;
