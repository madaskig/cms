import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Stack from "../Stack";
import Spinner from "../Spinner";
import CheckIcon from "~/ui/icons/Check";
import CrossIcon from "~/ui/icons/Cross";

export type Variant = "default" | "reversed";
export type Indicator = "error" | "pending" | "success" | "idle";

export type Props = {
  label?: string;
  variant?: Variant;
  indicator?: Indicator;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const variantContainerStyle: Record<Variant, string> = {
  default: "bg-gray-100 p-1.5",
  reversed: "bg-transparent",
};

const variantInputStyle: Record<Variant, string> = {
  default: "bg-white",
  reversed: "bg-gray-100 shadow-md shadow-gray-200",
};

const indicatorStyle: Record<Indicator, string> = {
  error: "text-error",
  pending: "text-neutral",
  success: "text-success",
  idle: "hidden text-neutral",
};

const getIndicatorIcon = (indicator?: Indicator) => {
  switch (indicator) {
    case "pending":
      return <Spinner />;
    case "error":
      return <CrossIcon />;
    case "success":
      return <CheckIcon />;
    default:
      return null;
  }
};

export default function LabeledInput({
  label,
  variant = "default",
  indicator = "idle",
  ...inputProps
}: Props) {
  const IndicatorComponent = getIndicatorIcon(indicator);

  return (
    <div
      className={`relative w-full rounded-md ${variantContainerStyle[variant]}`}
    >
      {label ? (
        <label
          htmlFor={inputProps.id}
          className="block mb-1 w-full text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {label}
        </label>
      ) : null}
      <Stack
        direction="horizontal"
        className={`w-full p-1 items-center rounded-md ${variantInputStyle[variant]}`}
      >
        <input
          type="text"
          {...inputProps}
          className={`block flex-1 text-sm`}
        ></input>
        {IndicatorComponent ? (
          <div className={`flex-none size-4 ${indicatorStyle[indicator]}`}>
            {IndicatorComponent}
          </div>
        ) : null}
      </Stack>
    </div>
  );
}
