import Image from "next/image";

export default function ImagePreview({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div className="relative w-full aspect-square rounded-md overflow-hidden">
      <Image src={src} alt={name} fill />
      <div className="absolute bottom-0 left-0 right-0 w-full p-1 flex">
        <span className="inline-block text-xs font-bold leading-none bg-white text-gray-600 rounded-md px-1 py-0.5 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </span>
      </div>
    </div>
  );
}
