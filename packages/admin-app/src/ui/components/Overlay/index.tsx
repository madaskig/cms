import { ReactNode } from "react";

export function Overlay({ children }: { children?: ReactNode }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/10 z-[999]">
      {children || null}
    </div>
  );
}
