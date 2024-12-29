import { ReactNode } from "react";
import Heading from "../Heading";
import Stack from "../Stack";

export type Props = {
  className?: string;
  children?: ReactNode[];
  title?: string;
  asGrid?: boolean;
};

export default function Gallery({
  children,
  title,
  asGrid = false,
  className,
}: Props) {
  return (
    <Stack className={className} spacing="lg">
      <Stack direction="horizontal">
        <Heading size="xl" as="h2" className="font-semibold text-neutral-faded">
          {title}
        </Heading>
      </Stack>
      {asGrid ? (
        <div className="relative grid grid-cols-12 gap-4">{children}</div>
      ) : (
        <Stack
          direction="horizontal"
          spacing="md"
          className="flex-wrap place-content-start overflow-auto h-full *:flex-none"
        >
          {children}
        </Stack>
      )}
    </Stack>
  );
}
