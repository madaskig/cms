import ImageUploader from "~/ui/features/ImageUploader";

export default function Page() {
  return (
    <div className="fixed w-[100vw] h-[100vh] md:p-[4vw] flex justify-center items-center">
      <div className="relative size-full md:max-w-[720px] md:h-2/3 p-12 bg-white rounded-md shadow-md shadow-gray-200">
        <ImageUploader />
      </div>
    </div>
  );
}
