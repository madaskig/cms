import { ReactNode } from "react";
import Stack from "@components/Stack";
import DocPlaceholderIcon from "@icons/DocPlaceholder";
import { ItemsSchema } from "@madaskig/cms-db/types";

type Props = {
  className?: string;
} & ItemsSchema;

export function ItemTileImgContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative aspect-square ${className}`}>{children}</div>
  );
}

export default function ItemTile({ className, name, slug }: Props) {
  return (
    <Stack className={`${className}`} spacing="lg">
      <ItemTileImgContainer className="flex-1 min-h-0 rounded-md transition-shadow md:hover:shadow-gray-500 shadow-md shadow-gray-400 bg-white">
        <Stack className="size-full justify-center items-center">
          <div className="relative size-8 text-neutral-faded">
            <DocPlaceholderIcon />
          </div>
        </Stack>
      </ItemTileImgContainer>
      <div className="flex-none leading-none h-[2lh]">
        <p className="font-semibold text-black">{name}</p>
        <p className="text-sm font-semibold text-neutral-faded">{slug}</p>
      </div>
    </Stack>
  );
}
