import type React from "react";
import { useState } from "react";

interface FormData {
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
    tempMax: "",
    tempMin: "",
    precipMax: "",
    precipMin: "",
    evapMax: "",
    evapMin: "",
    deficitMax: "",
    deficitMin: "",
    diasSemChuva: "",
    tempAcimaX: "",
    diasAcimaX: "",
    tipoCultura: "",
    porcentagemAumento: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Adicione aqui a lógica para enviar os dados
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}
