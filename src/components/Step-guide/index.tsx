import React from 'react';
import { Download, Upload, Calculator, BarChart } from 'lucide-react';
import { Box, Button, Typography, IconButton } from '@mui/material';

export default function StepGuide() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 4,
        py: 8,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#428C5C',
            fontWeight: 'medium',
            maxWidth: 528,
            border: 2,
            borderColor: '#428C5C',
            borderRadius: 1,
            py: 2,
            px: 4,
          }}
        >
          Para realizar a análise de suas terras, realize os seguintes passos
        </Typography>
      </Box>

      {/* Steps */}
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
        }}
      >
        <Step
          number={1}
          title="Realize o download da planilha modelo em formato CSV"
          icon={<Download />}
        />
        <Step
          number={2}
          title="Preencha a planilha com as informações de suas terras"
          icon={<Upload />}
          inverted
        />
        <Step
          number={3}
          title="Realize o upload da planilha em nosso módulo de análise"
          icon={<Upload />}
        />
        <Step
          number={4}
          title="Adicione as métricas para o cálculo dos dados"
          icon={<Calculator />}
          inverted
        />
        <Step
          number={5}
          title="Receba os dados de sua análise distribuído em gráficos"
          icon={<BarChart />}
        />
      </Box>

      {/* Start Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#428C5C',
          '&:hover': { backgroundColor: '#277357' },
          color: 'white',
          px: 8,
        }}
        href="/analysisform"
      >
        INICIAR
      </Button>

      {/* Bottom Toolbar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'gray',
          color: 'white',
          p: 3,
          display: 'none',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <ToolbarIcon icon={<Download />} />
        <ToolbarIcon icon={<Upload />} />
        <ToolbarIcon icon={<Calculator />} />
        <ToolbarIcon icon={<BarChart />} />
      </Box>
    </Box>
  );
}

function Step({
  number,
  title,
  inverted = false,
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        gap: 5,
        flexDirection: inverted ? 'row-reverse' : 'row',
      }}
    >
      <img src={`/${number}.svg`} alt={`Step ${number}`} />
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: number == 1 ? 'flex-end' : 'start',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontSize: '20px',
              fontWeight: '600',
              textAlign: inverted ? 'left' : 'right',
            }}
          >
            {title}
          </Typography>
          {number == 1 && (
            <a
              href="/dataset.csv"
              style={{
                color: '#277357',
                textDecoration: 'underline',
                fontWeight: 'semibold',
                fontFamily: 'Inter',
                textAlign: 'right',
              }}
            >
              disponível aqui
            </a>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function ToolbarIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <IconButton
      sx={{ p: 2, '&:hover': { backgroundColor: 'darkgray' }, borderRadius: 1 }}
    >
      {icon}
    </IconButton>
  );
}
