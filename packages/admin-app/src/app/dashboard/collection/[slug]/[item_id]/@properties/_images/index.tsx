import ImagePreview from "./ImagePreview";
import ImagePlaceholder from "./ImagePlaceholder";
import ButtonContextual from "@components/Button/ButtonContextual";
import Stack from "@components/Stack";
import { ModalLauncher } from "~/contexts/modal";
import { MetaSchema } from "@madaskig/cms-db/types";

export default function Images({ list }: { list: MetaSchema[] }) {
  const previews = list.slice(0, 2);
  const placeholders: React.ReactNode[] = [];

  let i = 0;
  while (previews.length + placeholders.length < 2) {
    i++;
    placeholders.push(
      <div key={i} className="relative flex-1 aspect-square">
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
              <ImagePreview src={preview.value!} name={preview.key} />
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
            size: "xl",
          }}
        >
          <ButtonContextual context="add-cta" label="Add" size="lg" />
        </ModalLauncher>
      </Stack>
    </Stack>
  );
}
