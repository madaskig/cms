import Button, { Props as ButtonProps } from ".";
import CheckIcon from "@icons/Check";
import CrossIcon from "@icons/Cross";
import PlusIcon from "@icons/Plus";
import RefreshIcon from "@icons/Refresh";
import UploadIcon from "@icons/Upload";

type Context =
  | "validate"
  | "upload"
  | "cancel"
  | "refresh"
  | "info"
  | "info-secondary"
  | "add"
  | "add-cta";

const colorStyle: Record<Context, string> = {
  info: "bg-neutral text-neutral-secondary",
  "info-secondary": "bg-neutral-faded text-neutral-secondary",
  validate: "bg-success text-neutral-secondary",
  cancel: "bg-error text-neutral-secondary",
  upload: "bg-success text-neutral-secondary",
  refresh: "bg-neutral-faded text-neutral-secondary",
  add: "bg-neutral-very-faded text-neutral",
  "add-cta": "bg-neutral text-neutral-secondary",
};

const getIcon = (context: Context) => {
  switch (context) {
    case "validate":
      return <CheckIcon />;
    case "upload":
      return <UploadIcon />;
    case "cancel":
      return <CrossIcon />;
    case "refresh":
      return <RefreshIcon />;
    case "info":
    case "info-secondary":
      return null;
    case "add":
    case "add-cta":
      return (
        <div className="relative size-full p-0.5">
          <PlusIcon />
        </div>
      );
    default:
      return null;
  }
};

export default function ButtonContextual({
  context,
  className,
  type = "button",
  ...btnProps
}: {
  context: Context;
} & Omit<ButtonProps, "color" | "icon">) {
  return (
    <Button
      type={type}
      icon={getIcon(context)}
      className={`${colorStyle[context]}${className ? ` ${className}` : ""}`}
      {...btnProps}
    />
  );
}
