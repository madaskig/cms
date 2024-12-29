import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { UI } from "~/types";

const iconSizeStyle: Record<UI.Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
};

const labelSizeStyle: Record<UI.Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export type Props = {
  icon?: React.ReactNode;
  label?: string;
  size?: UI.Size;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  icon,
  label,
  size = "md",
  className,
  disabled,
  ...buttonProps
}: Props) {
  return (
    <button
      className={`relative p-1 rounded-md flex ${className} ${disabled ? "opacity-50" : ""}`}
      disabled={disabled}
      {...buttonProps}
    >
      {icon ? (
        <div className={`relative ${iconSizeStyle[size]}`}>{icon}</div>
      ) : null}
      {label ? (
        <span className={`px-1 ${labelSizeStyle[size]}`}>{label}</span>
      ) : null}
    </button>
  );
}
