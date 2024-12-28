"use client";

import Button from "../Button";
import CrossIcon from "../icons/Cross";
import RefreshIcon from "../icons/Refresh";
import UploadIcon from "../icons/Upload";

export default function Actions({
  className,
  onCancel,
  onReset,
  onSubmit,
  isReadyToUpload,
  disabled,
}: {
  className?: string;
  onCancel?: () => void;
  onReset?: () => void;
  onSubmit?: () => void;
  isReadyToUpload?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`relative w-full flex flex-row justify-end items-center gap-1 ${className} ${disabled ? "opacity-80" : ""}`}
    >
      {onCancel ? (
        <Button
          className="bg-red-500 text-white"
          icon={<CrossIcon />}
          onClick={onCancel}
        />
      ) : null}
      {onReset ? (
        <Button
          className="bg-gray-500 text-white"
          icon={<RefreshIcon />}
          onClick={onReset}
          disabled={disabled || !isReadyToUpload}
        />
      ) : null}
      {onSubmit ? (
        <Button
          className="bg-green-500 text-white"
          icon={<UploadIcon />}
          onClick={onSubmit}
          disabled={disabled || !isReadyToUpload}
        />
      ) : null}
    </div>
  );
}
