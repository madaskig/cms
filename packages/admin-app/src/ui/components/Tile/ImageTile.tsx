import Stack from "@components/Stack";
import Image from "next/image";
import { UI } from "~/types";
import CheckIcon from "~/ui/icons/Check";

type Props = {
  className?: string;
  name: string;
  src: string;
  imgWidth?: number;
  imgHeight?: number;
  aspectRatio?: UI.AspectRatio;
  isSelected?: boolean;
};

const aspectRatioStyles: Record<UI.AspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-portrait",
  landscape: "aspect-landscape",
};

export default function ImageTile({
  className,
  name,
  src,
  imgWidth,
  imgHeight,
  aspectRatio,
  isSelected,
}: Props) {
  const shouldImgFill = !imgHeight || !imgWidth;

  return (
    <Stack className={`relative w-full rounded-md`} spacing="sm">
      {isSelected ? (
        <div className="absolute -inset-2 flex justify-center items-center bg-white z-0 rounded-md ring-2 ring-green-500 shadow-lg shadow-gray-300/70 animate-fadein"></div>
      ) : null}
      <div
        className={`relative w-full ${shouldImgFill ? aspectRatioStyles[aspectRatio || "landscape"] : ""}`}
      >
        <Image
          src={src}
          alt={name}
          fill={shouldImgFill}
          height={!shouldImgFill ? imgHeight : undefined}
          width={!shouldImgFill ? imgWidth : undefined}
          className={`object-cover`}
        />
        {isSelected ? (
          <div className="absolute inset-0 w-full h-full flex justify-center items-center bg-black/10 z-50 animate-fadein">
            <div className="relative size-7 p-1 rounded-full text-success bg-white shadow-lg shadow-white/30">
              <CheckIcon />
            </div>
          </div>
        ) : null}
      </div>
      <div className="z-10">
        <p className="text-sm font-medium">{name}</p>
      </div>
    </Stack>
  );
}
