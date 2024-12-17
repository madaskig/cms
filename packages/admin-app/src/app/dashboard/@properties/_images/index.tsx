import Button from "~/components/Button";
import PlusIcon from "~/components/icons/Plus";
import { Property } from "~/types";
import ImagePreview from "./ImagePreview";
import ImagePlaceholder from "./ImagePlaceholder";
import Link from "next/link";

export default function Images({ list }: { list: Property[] }) {
  const previews = list.slice(0, 2);
  const placeholders: React.ReactNode[] = [];

  let i = 0;
  while (previews.length + placeholders.length < 2) {
    i++;
    placeholders.push(<ImagePlaceholder key={i} />);
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-2">
        {previews.map((preview) => {
          return (
            <li key={preview.key} className="relative col-span-1">
              <ImagePreview src={preview.value!} name={preview.label} />
            </li>
          );
        })}
        {placeholders}
      </ul>
      <div className="flex flex-row items-center justify-end gap-1 mt-2">
        <Button
          className="bg-gray-500/80 text-white"
          label={`View all (${list.length})`}
        />
        <Link href={"/images/editor"}>
          <Button
            className="bg-gray-600 text-white flex-row-reverse"
            label="Add"
            icon={
              <div className="relative size-full p-0.5">
                <PlusIcon />
              </div>
            }
          />
        </Link>
      </div>
    </div>
  );
}
