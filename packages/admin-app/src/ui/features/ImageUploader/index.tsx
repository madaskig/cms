"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import validateImage from "~/helpers/utils/validateImage";
import getFileAsDataUrl from "~/helpers/utils/getFileAsDataUrl";
import Actions from "./Actions";
import ExclamationIcon from "@icons/Exclamation";
import Spinner from "@components/Spinner";

export default function ImageUploader({
  onCancel,
  onSubmit,
  onSuccess,
}: {
  onCancel?: () => void;
  onSubmit?: (o: { file: File; filename?: string }) => void;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "ready" | "pending"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [previewImgDataURL, setPreviewImgDataURL] = useState<string | null>();
  const [droppedFile, setDroppedFile] = useState<File | null>();
  const [filename, setFileName] = useState<string>();

  const fileReader = useRef<FileReader>();

  const reset = () => {
    setErrorMsg(null);
    setPreviewImgDataURL(null);
    setDroppedFile(null);
    setStatus("idle");
  };

  const handleDrop = useCallback(async (droppedFiles: File[]) => {
    if (status === "pending") {
      return;
    }

    setErrorMsg(null);
    setDroppedFile(null);

    const file = droppedFiles[0];
    const error = validateImage(droppedFiles[0]);

    if (error) {
      setErrorMsg(error);
      setStatus("error");
    } else {
      setDroppedFile(file);

      if (!fileReader.current) {
        fileReader.current = new FileReader();
      }

      const imgAsDataURL = await getFileAsDataUrl(fileReader.current, file);

      if (imgAsDataURL) {
        setPreviewImgDataURL(imgAsDataURL);
        setStatus("ready");
      } else {
        setStatus("error");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  useEffect(() => {
    return () => {
      if (fileReader.current) {
        fileReader.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    setFileName(droppedFile?.name || "");
  }, [droppedFile]);

  return (
    <div className="relative size-full flex flex-col px-12">
      <div className="flex-none h-12 flex items-center gap-1 text-red-500">
        {errorMsg ? (
          <>
            <div className="relative size-5">
              <ExclamationIcon />
            </div>
            <p className="font-medium">{errorMsg}</p>
          </>
        ) : null}
      </div>
      <div
        className={`relative flex-1 size-full bg-white rounded-lg border-2 border-gray-600 border-dashed text-gray-950 flex justify-center items-center cursor-pointer ${previewImgDataURL ? "opacity-100" : "opacity-70 md:hover:opacity-100"}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={status === "pending"} />
        <div>
          <p className="font-semibold">Drop image</p>
          <p className="text-sm">or click to select</p>
        </div>
        {previewImgDataURL ? (
          <div className="absolute inset-0 w-full h-full p-2">
            <img
              src={previewImgDataURL}
              className="w-full h-full object-contain"
            />
          </div>
        ) : null}
        {status === "pending" ? (
          <div className="absolute inset-0 w-full h-full bg-black/15 flex justify-center items-center">
            <div className="relative size-10">
              <Spinner />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-none h-12 flex flex-row justify-between gap-4">
        <div className="relative self-center flex-1">
          {droppedFile ? (
            <div className="bg-gray-200/80 rounded-md">
              <input
                type="text"
                className="w-full px-2 py-1 text-sm font-medium"
                placeholder="Enter filename"
                disabled={status === "pending"}
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                value={filename}
              ></input>
            </div>
          ) : null}
        </div>
        <Actions
          className="flex-1"
          isReadyToUpload={!!previewImgDataURL && status === "ready"}
          disabled={status === "pending"}
          onReset={reset}
          onCancel={onCancel}
          onSubmit={
            onSubmit
              ? async () => {
                  if (status === "pending") {
                    return;
                  }

                  if (droppedFile) {
                    try {
                      setStatus("pending");
                      await onSubmit({ file: droppedFile, filename });
                      setStatus("success");
                      onSuccess?.();
                    } catch (err) {
                      setErrorMsg("An error has occurred");
                      setStatus("error");
                    }
                  }
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
