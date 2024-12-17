import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Variant = "default" | "small";

const iconStyle: Record<Variant, string> = {
  default: "size-5",
  small: "size-3.5",
};

const labelStyle: Record<Variant, string> = {
  default: "text-sm",
  small: "text-xs",
};

export default function Button({
  icon,
  label,
  variant = "default",
  className,
  ...buttonProps
}: {
  icon?: React.ReactNode;
  label?: string;
  variant?: Variant;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`relative p-1 rounded-md flex ${className}`}
      {...buttonProps}
    >
      {icon ? (
        <div className={`relative ${iconStyle[variant]}`}>{icon}</div>
      ) : null}
      {label ? (
        <span className={`px-1 ${labelStyle[variant]}`}>{label}</span>
      ) : null}
    </button>
  );
}
