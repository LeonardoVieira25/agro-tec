import type React from 'react';
import { useState } from 'react';

export interface FormData {
  tempMax: string;
  tempMin: string;
  precipMax: string;
  precipMin: string;
  evapMax: string;
  evapMin: string;
  deficitMax: string;
  deficitMin: string;
  diasSemChuva: string;
  tempAcimaX: string;
  diasAcimaX: string;
  tipoCultura: string;
  porcentagemAumento: string;
}

export function useAnalysisForm() {
  const [formData, setFormData] = useState<FormData>({
    tempMax: '35',
    tempMin: '18',
    precipMax: '120',
    precipMin: '10',
    evapMax: '5',
    evapMin: '1',
    deficitMax: '30',
    deficitMin: '5',
    diasSemChuva: '10',
    tempAcimaX: '38',
    diasAcimaX: '7',
    tipoCultura: 'Milho',
    porcentagemAumento: '5.5',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Adicione aqui a lógica para enviar os dados
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
