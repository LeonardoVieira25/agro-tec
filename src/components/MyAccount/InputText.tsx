import { Input, InputLabel } from '@mui/material';

interface InputTextProps {
  label: string;
  value: string;
}

export const InputText = ({ label, value }: InputTextProps) => {
  return (
    <InputLabel
      sx={{
        fontWeight: '600',
        fontSize: '14px',
        color: '#2e2e2e',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {label}
      <Input
        sx={{
          p: '0.5rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid #fff',
          background: '#fff',
          color: '#2e2e2e', // Aplica a cor do texto no estilo principal
          fontSize: '14px',
          margin: '0.25rem',
          mt: '0.5rem',
          '&.Mui-focused': {
            borderColor: '#428C5C',
            outline: '1px solid #428C5C',
          },
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
          '&.Mui-disabled': {
            color: '#2e2e2e',
            '-webkit-text-fill-color': '#2e2e2e',
          },
        }}
        inputProps={{
          style: { color: '#2e2e2e' }, // Garante que a cor do texto seja aplicada
        }}
        value={value}
      />
    </InputLabel>
  );
};
