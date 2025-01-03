import { Property } from "~/types";
import ImagePreview from "./ImagePreview";
import ImagePlaceholder from "./ImagePlaceholder";
import Link from "next/link";
import ButtonContextual from "@components/Button/ButtonContextual";
import Stack from "@components/Stack";
import { ModalLauncher } from "~/contexts/modal";

export default function Images({ list }: { list: Property[] }) {
  const previews = list.slice(0, 2);
  const placeholders: React.ReactNode[] = [];

  let i = 0;
  while (previews.length + placeholders.length < 2) {
    i++;
    placeholders.push(
      <div className="relative flex-1 aspect-square">
        <ImagePlaceholder key={i} />
      </div>,
    );
  }

  return (
    <Stack>
      <Stack direction="horizontal" className="flex-nowrap">
        {previews.map((preview) => {
          return (
            <div key={preview.key} className="relative flex-1">
              <ImagePreview src={preview.value!} name={preview.label} />
            </div>
          );
        })}
        {placeholders}
      </Stack>
      <Stack direction="horizontal" spacing="sm" className="justify-end">
        <ButtonContextual
          context="info-secondary"
          label={`View all (${list.length})`}
        />
        <ModalLauncher
          modal={{
            type: "image-uploader",
            // title: "Upload image",
            size: "xl",
          }}
        >
          <ButtonContextual context="add-cta" label="Add" />
        </ModalLauncher>
      </Stack>
    </Stack>
  );
}
