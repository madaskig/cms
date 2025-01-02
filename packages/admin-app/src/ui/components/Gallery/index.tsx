import { ReactNode } from "react";
import Heading from "../Heading";
import Stack from "../Stack";
import { UI } from "~/types";

export type Props = {
  className?: string;
  children?: ReactNode[];
  title?: string | ReactNode;
  spacing?: UI.Size;
  gridSpacing?: UI.Size;
  asGrid?: boolean;
};

const gridSpacingStyle: Record<UI.Size, string> = {
  xs: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export default function Gallery({
  children,
  title,
  asGrid = false,
  spacing = "lg",
  gridSpacing = "md",
  className,
}: Props) {
  return (
    <Stack className={className} spacing={spacing}>
      <Stack direction="horizontal">
        <Heading size="xl" as="h2" className="font-semibold text-neutral-faded">
          {title}
        </Heading>
      </Stack>
      {asGrid ? (
        <div
          className={`relative grid grid-cols-12 ${gridSpacingStyle[gridSpacing]}`}
        >
          {children}
        </div>
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
