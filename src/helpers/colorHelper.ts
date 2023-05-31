export const buttonColorMap = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
};

export type ButtonColorLookup = keyof typeof buttonColorMap;

type LightenColorProps = {
  color: ButtonColorLookup; 
  percentage?: number;
}

export const lightenColor = ({color, percentage = 20}: LightenColorProps): string => {
  const value = parseInt(color.substring(1), 16);
  const amount = Math.round((percentage / 100) * 255);
  const newValue = Math.min(value + amount, 255);
  const lightenedColor = newValue.toString(16).padStart(2, '0');
  return `#${lightenedColor}`;
}