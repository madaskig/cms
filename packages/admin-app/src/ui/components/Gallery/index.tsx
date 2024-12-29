export type Item = {
  id: string | number;
};

export type Props<T extends Item> = {
  items: Array<T>;
  title?: string;
};

export default function Gallery<T extends Item>({ items }: Props<T>) {}
