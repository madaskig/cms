export enum PropertyType {
  numeric = "numeric",
  text = "text",
  kv = "kv",
  structuredText = "structured_text",
  image = "image",
}

export type Property = {
  key: string;
  value: string | null;
  type: PropertyType;
  label: string;
};

export type PropertyGroup = {
  id: string;
  label: string;
  type: PropertyType;
  properties: Property[];
};

export type Tag = {
  id: string;
  label: string;
};

export type TagsGroup = {
  id: string;
  label: string;
  tags: Tag[];
};
