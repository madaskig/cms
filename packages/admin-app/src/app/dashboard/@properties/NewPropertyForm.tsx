import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import CheckIcon from "~/components/icons/Check";
import CrossIcon from "~/components/icons/Cross";

function IconButton({
  icon,
  className,
  ...buttonProps
}: {
  icon: React.ReactNode;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={`relative p-1 rounded-md ${className}`} {...buttonProps}>
      <div className="relative size-3.5">{icon}</div>
    </button>
  );
}

export default function NewPropertyForm({
  onValidate,
  onCancel,
}: {
  onValidate?: (o: { key: string; value: string }) => void;
  onCancel?: () => void;
}) {
  return (
    <div className="relative bg-white rounded-lg">
      <p className="text-xs font-bold px-1 mb-1">Add new property</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <input
            name="key"
            className="bg-white px-1 rounded-md w-full text-sm"
            placeholder="key (e.g. ranking, external_link)"
          ></input>
        </div>
        <div>
          <input
            name="value"
            className="bg-white px-1 rounded-md w-full text-sm"
            placeholder="value"
          ></input>
        </div>
        <div className="relative w-full flex flex-row justify-end items-center gap-1">
          <IconButton
            className="bg-red-500 text-white"
            icon={<CrossIcon />}
            onClick={onCancel}
          />
          <IconButton
            className="bg-green-500 text-white"
            icon={<CheckIcon />}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
