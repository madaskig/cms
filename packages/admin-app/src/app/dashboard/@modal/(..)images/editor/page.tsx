"use client";

import ImageUploader from "@features/ImageUploader";
import { useRouter } from "next/navigation";
import upload from "~/helpers/utils/s3/upload";
import { uploadImage } from "~/actions/client/uploadImage";

export default function Page() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="fixed w-[100vw] h-[100vh] md:p-[4vw] flex justify-center items-center bg-slate-800/50 z-[999]">
      <div className="relative size-full md:max-w-[720px] md:h-2/3 bg-white rounded-md shadow-lg shadow-gray-500">
        <ImageUploader
          onCancel={goBack}
          onSuccess={goBack}
          onSubmit={async (args: { file: File; filename?: string }) => {
            await uploadImage(args);
          }}
        />
      </div>
    </div>
  );
}
