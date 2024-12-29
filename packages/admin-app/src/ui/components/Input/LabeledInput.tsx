import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function LabeledInput({ label, ...inputProps }: Props) {
  return (
    <div className="relative w-full rounded-md bg-gray-100 p-2 space-y-2">
      <label
        htmlFor={inputProps.id}
        className="block w-full text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {label}
      </label>
      <input
        type="text"
        {...inputProps}
        className="block w-full bg-white rounded-md text-sm p-1"
      ></input>
    </div>
  );
}
