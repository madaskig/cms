import { ReactNode } from "react";
import Stack from "@components/Stack";

type Props = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export default function Panel({ children, header, footer }: Props) {
  return (
    <Stack
      spacing="md"
      className="relative p-2 rounded-lg bg-white shadow-lg shadow-gray-200"
    >
      {header || null}
      {children}
      {footer || null}
    </Stack>
  );
}
