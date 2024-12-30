import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Variant = "default" | "reversed";

type Props = {
  label?: string;
  variant?: Variant;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const variantContainerStyle: Record<Variant, string> = {
  default: "bg-gray-100 p-1.5",
  reversed: "bg-transparent",
};

const variantInputStyle: Record<Variant, string> = {
  default: "bg-white",
  reversed: "bg-gray-100 shadow-md shadow-gray-200",
};

export default function LabeledInput({
  label,
  variant = "default",
  ...inputProps
}: Props) {
  return (
    <div
      className={`relative w-full rounded-md ${variantContainerStyle[variant]}`}
    >
      {label ? (
        <label
          htmlFor={inputProps.id}
          className="block mb-2 w-full text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {label}
        </label>
      ) : null}
      <input
        type="text"
        {...inputProps}
        className={`block w-full rounded-md text-sm p-1 ${variantInputStyle[variant]}`}
      ></input>
    </div>
  );
}
