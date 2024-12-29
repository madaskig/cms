"use client";

import Gallery from "@components/Gallery";
import { useState } from "react";
import Stack from "@components/Stack";
import ImageTile from "@components/Tile/ImageTile";
import ButtonContextual from "~/ui/components/Button/ButtonContextual";
import { Image } from "~/types";

type Props = {
  images: Array<Image>;
  onSelect?: () => void;
  onCancel?: () => void;
};

export default function ImageSelector({ images, onSelect, onCancel }: Props) {
  const [selectedImg, setSelectedImg] = useState<string | number>();

  return (
    <Stack>
      <Gallery title="Select an image" asGrid>
        {images.map((img, i) => {
          const isSelected =
            selectedImg !== undefined && img.id === selectedImg;

          return (
            <div
              key={img.id}
              className="relative col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer"
              onClick={() => setSelectedImg(img.id)}
            >
              <ImageTile
                src={img.src}
                name={img.name}
                isSelected={isSelected}
              />
            </div>
          );
        })}
      </Gallery>
      <Stack direction="horizontal" className="justify-end" spacing="sm">
        <ButtonContextual
          context="info-secondary"
          label="Cancel"
          onClick={onCancel}
        />
        <ButtonContextual context="info" label="Confirm" onClick={onSelect} />
      </Stack>
    </Stack>
  );
}
