import { FC } from "react";

const BasicStyle = {
  color: "#8ADA33",
  backgroundColor: "#000121",
  border: "2px solid #8ADA33",
  fontSize: "16px",
  padding: "10px 15px",
  borderRadius: "5px",
  maxWidth: "450px",
  margin: "10px 10px",
  cursor: "pointer",
  textTransform: "uppercase",
} as const;

const DisabledStyle = {
  backgroundColor: "#39393b",
  color: "#ffffff",
  cursor: "not-allowed",
};

export const Button: FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  children,
  style,
  ...rest
}) => {
  const isDisabled = rest.disabled ?? false;

  return (
    <button
      {...rest}
      style={{
        ...BasicStyle,
        ...(isDisabled ? DisabledStyle : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
};
