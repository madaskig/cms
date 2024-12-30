import { ReactNode, CSSProperties } from "react";
import Stack from "../Stack";

type Props = {
  className?: string;
  id: string | number;
  name: string;
  slug: string;
  count: number;
};

function CollectionIcon() {
  return (
    <div className="relative size-full">
      {new Array(3).fill(null).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            transform: `translate3d(${i * 6}px, ${-1 * i * 6}px, 0px)`,
            zIndex: 50 - i,
          }}
        >
          <div
            className={`relative w-full aspect-square rounded-md transition-shadow group-hover:shadow-gray-500 shadow-md shadow-gray-400 bg-white`}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default function CollectionTile({
  className,
  name,
  count,
  slug,
}: Props) {
  return (
    <div
      className={`group relative w-full aspect-square rounded-md ${className || ""}`}
    >
      <CollectionIcon />
      <Stack
        spacing="xs"
        className="absolute inset-0 p-2 w-full h-full justify-end items-start z-[60]"
      >
        <div className="leading-[0]">
          <span className="text-sm font-medium text-neutral-faded">
            {count || 0}
          </span>
        </div>
        <div className="leading-[0]">
          <span className="text-base font-bold">{name}</span>
        </div>
      </Stack>
    </div>
  );
}
