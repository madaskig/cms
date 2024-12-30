import {
  cloneElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from "react";
import { UI } from "~/types";

export type Props = {
  size?: UI.Size;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: ReactNode;
};

const sizeStyle: Record<UI.Size, string> = {
  xs: "text-xs font-bold",
  sm: "text-sm font-bold",
  md: "text-base font-bold",
  lg: "text-lg font-bold",
  xl: "text-xl font-bold",
};

const Wrapper = ({ as, ...props }: { as: Props["as"] }) => {
  switch (as) {
    case "h1":
      return <h1 {...props} />;
    case "h2":
      return <h2 {...props} />;
    case "h3":
      return <h3 {...props} />;
    case "h4":
      return <h4 {...props} />;
    case "h5":
      return <h5 {...props} />;
    case "h6":
      return <h6 {...props} />;
    case "p":
      return <p {...props} />;
  }
};

export default function Heading({
  size = "md",
  as,
  className,
  ...props
}: Props &
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return cloneElement(<Wrapper as={as} />, {
    ...props,
    className: `leading-none ${sizeStyle[size]}${className ? ` ${className}` : ""}`,
  });
}
