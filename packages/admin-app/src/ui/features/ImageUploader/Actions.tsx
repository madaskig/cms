"use client";

import ButtonContextual from "@components/Button/ButtonContextual";

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
        <ButtonContextual context="cancel" onClick={onCancel} />
      ) : null}
      {onReset ? (
        <ButtonContextual
          context="refresh"
          onClick={onReset}
          disabled={disabled || !isReadyToUpload}
        />
      ) : null}
      {onSubmit ? (
        <ButtonContextual
          context="upload"
          onClick={onSubmit}
          disabled={disabled || !isReadyToUpload}
        />
      ) : null}
    </div>
  );
}
