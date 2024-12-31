import Stack from "@components/Stack";
import Heading from "@components/Heading";
import { ReactNode } from "react";
import { UI } from "~/types";

type Props = {
  title?: string;
  variant?: UI.Size;
  children: ReactNode;
};

const variantStyle: Record<UI.Size, string> = {
  xs: "md:max-w-[320px]",
  sm: "md:max-w-[320px]",
  md: "md:max-w-[460px]",
  lg: "md:max-w-[620px]",
  xl: "md:max-w-[720px]",
};

export function Modal({ title, variant = "md", children }: Props) {
  return (
    <Stack
      spacing="lg"
      className={`w-full max-h-[75vh] p-4 bg-white rounded-md shadow-lg shadow-gray-300 ${variantStyle[variant]}`}
    >
      {title ? (
        <Heading size="lg" as="h2">
          {title}
        </Heading>
      ) : null}
      {children}
    </Stack>
  );
}
