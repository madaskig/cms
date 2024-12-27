"use client";

import ImageUploader from "~/components/ImageUploader";
import { useRouter } from "next/navigation";
import upload from "~/helpers/utils/s3/upload";

export default function Page() {
  const router = useRouter();

  return (
    <div className="fixed w-[100vw] h-[100vh] md:p-[4vw] flex justify-center items-center bg-slate-800/50 z-[999]">
      <div className="relative size-full md:max-w-[720px] md:h-2/3 p-12 bg-white rounded-md shadow-lg shadow-gray-500">
        <ImageUploader
          onCancel={() => {
            router.back();
          }}
          onSubmit={async (file?: File) => {
            if (file) {
              // const formData = new FormData();
              // formData.append("file_to_upload", file);

              console.log(file.type);

              const fileName = file.name || "imgfile";

              await fetch(`/images?k=${fileName}`, {
                method: "POST",
                body: file,
                headers: {
                  "content-type": file.type,
                },
              });

              return "ok";

              // upload({ bucketName: "assets", formData });
            }
          }}
        />
      </div>
    </div>
  );
}
