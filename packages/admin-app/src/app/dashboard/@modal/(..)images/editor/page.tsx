import ImageUploader from "~/components/ImageUploader";

export default function Page() {
  return (
    <div className="fixed w-[100vw] h-[100vh] md:p-[4vw] flex justify-center items-center bg-slate-800/50 z-[999]">
      <div className="relative size-full md:max-w-[720px] md:h-2/3 p-12 bg-white rounded-md shadow-lg shadow-gray-500">
        <ImageUploader />
      </div>
    </div>
  );
}
