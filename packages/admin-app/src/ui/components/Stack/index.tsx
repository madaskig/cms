import { ReactNode } from "react";
import { UI } from "~/types";

type Props = {
  children: ReactNode | ReactNode[];
  spacing?: UI.Size;
  direction?: UI.Direction;
  isReversed?: boolean;
  className?: string;
};

const directionStyle: Record<
  UI.Direction,
  { default: string; reversed: string }
> = {
  horizontal: { default: "flex-row", reversed: "flex-row-reverse" },
  vertical: { default: "flex-col", reversed: "flex-col-reverse" },
};

const spacingStyle: Record<UI.Size, string> = {
  xs: "gap-0",
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
  xl: "gap-6",
};

export default function Stack({
  children,
  spacing = "md",
  direction = "vertical",
  isReversed = false,
  className = "",
}: Props) {
  return (
    <div
      className={`flex ${directionStyle[direction][isReversed ? "reversed" : "default"]} ${spacingStyle[spacing]} ${className}`}
    >
      {children}
    </div>
  );
}
