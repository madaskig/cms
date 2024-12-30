import { Property } from "~/types";
import ImagePreview from "./ImagePreview";
import ImagePlaceholder from "./ImagePlaceholder";
import Link from "next/link";
import ButtonContextual from "@components/Button/ButtonContextual";
import Stack from "@components/Stack";

export default function Images({ list }: { list: Property[] }) {
  const previews = list.slice(0, 2);
  const placeholders: React.ReactNode[] = [];

  let i = 0;
  while (previews.length + placeholders.length < 2) {
    i++;
    placeholders.push(<ImagePlaceholder key={i} />);
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
        <Link href={"/images/editor"}>
          <ButtonContextual context="add-cta" label="Add" />
        </Link>
      </Stack>
    </Stack>
  );
}
