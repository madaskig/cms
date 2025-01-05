import { MetaSchema, MetaType } from "@madaskig/cms-db/types";

export function extractMetaFormData(formData: FormData): MetaSchema {
  const itemIdStr = formData.get("item") as string;
  const collectionIdStr = formData.get("collection") as string;
  const type = formData.get("type") as string;
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;

  const itemId = Number(itemIdStr);
  const collectionId = Number(collectionIdStr);

  if (!collectionId || !itemId || !value || !key) {
    throw new Error("Missing itemId, collectionId, key or value");
  }

  const isTypeValid = !!Object.values(MetaType).includes(
    type as (typeof MetaType)[keyof typeof MetaType],
  );

  if (!isTypeValid) {
    throw new Error("Invalid meta type");
  }

  const meta: MetaSchema = {
    itemId,
    itemCollectionId: collectionId,
    key,
    value,
    type: type || MetaType.text,
  };

  return meta;
}
