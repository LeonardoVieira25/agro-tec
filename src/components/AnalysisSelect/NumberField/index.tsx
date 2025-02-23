import { Box, Button, Input } from "@mui/material";

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function NumberField({ label, value, onChange }: NumberFieldProps) {
  const handleIncrement = () => {
    const currentValue = Number(value) || 0;
    onChange(String(currentValue + 1));
  };

  const handleDecrement = () => {
    const currentValue = Number(value) || 0;
    if (currentValue > 0) {
      onChange(String(currentValue - 1));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <label className="text-sm font-medium">{label}</label>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          type="button"
          onClick={handleDecrement}
          sx={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            borderRadius: "4px",
            borderColor: "darkgray",
            bgcolor: "#D9D9D9",
            color: "black", // Change the color of the "+"
          }}
        >
          -
        </Button>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            width: "64px",
            height: "32px",
            textAlign: "center",
            border: "1px solid",
            borderRadius: "4px",
          }}
        />
        <Button
          type="button"
          onClick={handleIncrement}
          sx={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            borderColor: "darkgray",
            borderRadius: "4px",
            bgcolor: "#D9D9D9",
            color: "black", // Change the color of the "+"
          }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}
