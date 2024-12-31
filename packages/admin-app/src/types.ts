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

export type MIMEType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/svg+xml"
  | "image/tiff";

export type S3Image = {
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
};

export type Image = {
  id: string | number;
  src: string;
  name: string;
  size?: number;
};

export type ModalProps = {
  closeModal: () => void;
};

export namespace UI {
  export type Size = "xs" | "sm" | "md" | "lg" | "xl";
  export type Direction = "horizontal" | "vertical";
  export type AspectRatio = "square" | "landscape" | "portrait";

  export enum Color {
    neutral = "neutral",
    "neutral-faded" = "neutral-faded",
    "neutral-very-faded" = "neutral-very-faded",
    "neutral-secondary" = "neutral-secondary",
    brand = "brand",
    success = "success",
    warning = "warning",
    error = "error",
  }
}
