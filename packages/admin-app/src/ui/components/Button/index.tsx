import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { UI } from "~/types";

const iconSizeStyle: Record<UI.Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
};

const labelSizeStyle: Record<UI.Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export type Props = {
  icon?: ReactNode;
  label?: string | ReactNode;
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
      className={`relative p-1 rounded-md flex justify-center items-center ${className} ${disabled ? "opacity-50" : ""}`}
      disabled={disabled}
      {...buttonProps}
    >
      {icon ? (
        <div className={`relative ${iconSizeStyle[size]}`}>{icon}</div>
      ) : null}
      {label ? (
        <div
          className={`h-full flex justify-center items-center px-1 ${labelSizeStyle[size]}`}
        >
          {label}
        </div>
      ) : null}
    </button>
  );
}
