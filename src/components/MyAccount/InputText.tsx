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
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {label}
      <Input
        sx={{
          p: '0.5rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid #202024',
          background: '#202024',
          color: '#f2f2f2', // Aplica a cor do texto no estilo principal
          fontSize: '14px',
          mt: '0.5rem',
          '&.Mui-focused': {
            borderColor: '#4285F4',
            outline: '2px solid #4285F4',
          },
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
          '&.Mui-disabled': {
            color: '#f2f2f2',
            '-webkit-text-fill-color': '#f2f2f2',
          },
        }}
        inputProps={{
          style: { color: '#f2f2f2' }, // Garante que a cor do texto seja aplicada
        }}
        value={value}
      />
    </InputLabel>
  );
};
