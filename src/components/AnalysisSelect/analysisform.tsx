'use client';
import { Upload } from '@mui/icons-material';
import { Box, Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { NumberField } from './NumberField';
import {
  FormData as FormDataType,
  useAnalysisForm,
} from './UseAnalysis/use-analysis-form';
import AnalisePage from '../../pages/analise';

export function AnalysisForm({
  onSubmitted,
}: {
  onSubmitted: (result: any) => any;
}) {
  const { formData, handleChange } = useAnalysisForm();
  const [file, setFile] = useState<File | null>(null);

  const [analiseData, setAnaliseData] = useState<any>();
  async function clickOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(file);
    if (!file) {
      alert('Please upload a file.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('csvFile', file);
    formDataToSend.append('tempMax', formData.tempMax.toString());
    formDataToSend.append('tempMin', formData.tempMin.toString());
    formDataToSend.append('precipMax', formData.precipMax.toString());
    formDataToSend.append('precipMin', formData.precipMin.toString());
    formDataToSend.append('evapMax', formData.evapMax.toString());
    formDataToSend.append('evapMin', formData.evapMin.toString());
    formDataToSend.append('deficitMax', formData.deficitMax.toString());
    formDataToSend.append('deficitMin', formData.deficitMin.toString());
    formDataToSend.append('daysWithoutRain', formData.diasSemChuva.toString());
    formDataToSend.append('tempAboveX', formData.tempAcimaX.toString());
    formDataToSend.append('daysAboveX', formData.diasAcimaX.toString());
    formDataToSend.append('agriculture', formData.tipoCultura);
    formDataToSend.append('priceIncreasePerc', formData.porcentagemAumento);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // onSubmitted(result);

      if (result.error) {
        throw new Error('Network response was not ok');
      }

      setAnaliseData(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  if (analiseData) {
    return <AnalisePage analiseData={analiseData} />;
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: 5,
        p: 6,
        maxWidth: 'auto',
        mx: 'auto',
        fontFamily: 'Arial, sans-serif', // Definindo a fonte padrão do projeto
      }}
    >
      <form onSubmit={clickOnSubmit}>
        {/* Título */}
        <Typography
          variant="h6"
          textAlign="center"
          mb={2}
          sx={{ color: '#2e2e2e' }}
        >
          Dados para Análise
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid',
              borderColor: '#428C5C',
              borderRadius: 2,
              py: 1,
              mb: 4,
              cursor: 'pointer',
              gap: '10px',
              width: '50%',
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Typography fontWeight="medium" sx={{ color: '#2e2e2e' }}>
              Arquivo
            </Typography>
            <Upload />
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={(event) => {
                console.log(event);
                if (event.target.files) {
                  console.log(event.target.files[0]);
                  setFile(event.target.files[0]);
                }
              }}
              accept=".csv"
            />
          </Box>
        </div>

        {/* Campos Numéricos */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            mb: 4,
          }}
        >
          {[
            { label: 'Temperatura Máxima', key: 'tempMax' },
            { label: 'Temperatura Mínima', key: 'tempMin' },
            { label: 'Precipitação Max', key: 'precipMax' },
            { label: 'Precipitação Min', key: 'precipMin' },
            { label: 'Evaporação Máxima', key: 'evapMax' },
            { label: 'Evaporação Mínima', key: 'evapMin' },
            { label: 'Déficit Hídrico Max', key: 'deficitMax' },
            { label: 'Déficit Hídrico Min', key: 'deficitMin' },
            { label: 'Dias sem chuva', key: 'diasSemChuva' },
            { label: 'Temperatura máxima para avaliação', key: 'tempAcimaX' },
            {
              label: 'Quantidade de dias acima da temperatura',
              key: 'diasAcimaX',
            },
          ].map(({ label, key }) => (
            <NumberField
              key={key}
              label={label}
              value={formData[key as keyof FormDataType]}
              onChange={(value) =>
                handleChange(key as keyof FormDataType, value)
              }
            />
          ))}
        </Box>

        {/* Inputs de Texto */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Tipo de Cultura
            </Typography>
            <Input
              type="text"
              value={formData.tipoCultura}
              onChange={(e) => handleChange('tipoCultura', e.target.value)}
              placeholder="Ex: Milho"
              sx={{
                px: 2,
                py: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 1,
                margin: '8px 0', // Adicionando margem aos inputs
                fontFamily: 'Arial, sans-serif', // Definindo a fonte dos inputs
                '&:hover': {
                  borderColor: 'green', // Cor da borda ao passar o mouse
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Porcentagem de aumento de preço
            </Typography>
            <Input
              type="text"
              value={formData.porcentagemAumento}
              onChange={(e) =>
                handleChange('porcentagemAumento', e.target.value)
              }
              placeholder="Ex: 5.5"
              sx={{
                px: 2,
                py: 1.5,
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 1,
                margin: '8px 0', // Adicionando margem aos inputs
                fontFamily: 'Arial, sans-serif', // Definindo a fonte dos inputs
                '&:hover': {
                  borderColor: 'green', // Cor da borda ao passar o mouse
                },
              }}
            />
          </Box>
        </Box>

        {/* Botão de Envio */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#428C5C',
              '&:hover': { filter: 'brightness(0.9)' },
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontFamily: 'Inter, sans-serif', // Definindo a fonte do botão
              fontWeight: '600',
            }}
            type="submit"
            // onClick={() => {
            //   // window.location.href = '/analise';
            //   clickOnSubmit()
            // }}
          >
            Analisar Dados
          </Button>
        </Box>
      </form>
    </Box>
  );
}
