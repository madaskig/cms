import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Button from "~/components/Button";
import CheckIcon from "~/components/icons/Check";
import CrossIcon from "~/components/icons/Cross";

export default function NewKVForm({
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
          <Button
            className="bg-red-500 text-white"
            variant="small"
            icon={<CrossIcon />}
            onClick={onCancel}
          />
          <Button
            className="bg-green-500 text-white"
            variant="small"
            icon={<CheckIcon />}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
