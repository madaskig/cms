"use client";

import { RefObject } from "react";
import PlusIcon from "../icons/Plus";

export type Variant = "default" | "small";

const variantContainerStyles: Record<Variant, string> = {
  default: "h-8",
  small: "h-6",
};

const variantIconStyles: Record<Variant, string> = {
  default: "size-5",
  small: "size-4",
};

export default function AddButton({
  ref,
  variant = "default",
  isInline,
  className,
  style,
  onClick,
}: {
  ref?: RefObject<HTMLButtonElement>;
  variant?: Variant;
  isInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <button
      className={`relative ${isInline ? "inline-flex" : "flex"} items-center justify-center ${variantContainerStyles[variant]} px-2 py-1 rounded-md bg-gray-300/70 text-gray-800 ${className}`}
      style={style}
      onClick={onClick}
      ref={ref}
    >
      <div className={`relative ${variantIconStyles[variant]}`}>
        <PlusIcon />
      </div>
    </button>
  );
}
