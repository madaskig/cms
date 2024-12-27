"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import validateImage from "~/helpers/utils/validateImage";
import getFileAsDataUrl from "~/helpers/utils/getFileAsDataUrl";
import Actions from "./Actions";

export default function ImageUploader({
  onCancel,
  onSubmit,
}: {
  onCancel?: () => void;
  onSubmit?: (file?: File) => void;
}) {
  const [status, setStatus] = useState<
    "idle" | "error" | "success" | "ready" | "pending"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [previewImgDataURL, setPreviewImgDataURL] = useState<string | null>();
  const [droppedFile, setDroppedFile] = useState<File | null>();

  const fileReader = useRef<FileReader>();

  const reset = () => {
    setErrorMsg(null);
    setPreviewImgDataURL(null);
    setStatus("idle");
  };

  const handleDrop = useCallback(async (droppedFiles: File[]) => {
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

  return (
    <div className="relative size-full">
      <div
        className={`relative size-full bg-white rounded-lg border-2 border-gray-600 border-dashed text-gray-950 flex justify-center items-center cursor-pointer ${previewImgDataURL ? "opacity-100" : "opacity-70 md:hover:opacity-100"}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
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
      </div>
      <Actions
        className="mt-2"
        isReadyToUpload={!!previewImgDataURL && status === "ready"}
        onReset={reset}
        onCancel={onCancel}
        onSubmit={
          onSubmit ? () => onSubmit(droppedFile || undefined) : undefined
        }
      />
    </div>
  );
}
