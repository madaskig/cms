"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TextEditor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      className="bg-white w-full h-full *:!border-none"
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
