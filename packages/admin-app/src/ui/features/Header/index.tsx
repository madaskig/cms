import Stack from "~/ui/components/Stack";

type Props = {
  className?: string;
};

const MAIN_TABS: Array<{
  id: string;
  label: string;
  href: string;
}> = [
  { id: "collections", label: "Collections", href: "/collections" },
  { id: "images", label: "Images", href: "/images" },
  { id: "tags", label: "Tags", href: "/tags" },
];

const activeStyle = {
  active: "bg-neutral-faded/70 text-neutral-secondary font-semibold",
  inactive: "bg-transparent text-neutral font-semibold",
};

export default function Header({ className }: Props) {
  return (
    <nav
      className={`h-header py-4 px-[2vw] flex flex-row justify-center items-center ${className || ""}`}
    >
      <Stack
        direction="horizontal"
        className="p-2 bg-neutral-secondary rounded-full shadow-xl shadow-gray-300/60 items-center justify-center"
      >
        {MAIN_TABS.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`px-3 py-1.5 rounded-full leading-[0] ${activeStyle[tab.id === "collections" ? "active" : "inactive"]}`}
            >
              <span className="text-sm uppercase">{tab.label}</span>
            </div>
          );
        })}
      </Stack>
    </nav>
  );
}
