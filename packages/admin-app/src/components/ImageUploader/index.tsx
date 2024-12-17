"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader() {
  const handleDrop = useCallback((droppedFiles) => {
    console.log("drop!");
    console.log(droppedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  useEffect(() => {
    console.log({
      isDragActive,
    });
  }, [isDragActive]);

  return (
    // <div className="relative size-full flex flex-col gap-2">
    <div
      className="relative size-full bg-white rounded-lg border-2 border-gray-600 border-dashed text-gray-950 flex justify-center items-center cursor-pointer opacity-70 md:hover:opacity-100"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div>
        <p className="font-semibold">Drop image</p>
        <p className="text-sm">or click to select</p>
      </div>
    </div>
    // </div>
  );
}
