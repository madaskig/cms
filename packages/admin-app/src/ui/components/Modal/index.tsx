import Stack from "@components/Stack";
import Heading from "@components/Heading";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function Modal({ title, children }: Props) {
  return (
    <Stack
      spacing="lg"
      className="w-full max-w-[460px] max-h-[75vh] p-4 bg-white rounded-md shadow-lg shadow-gray-300"
    >
      <Heading size="lg" as="h2">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}
