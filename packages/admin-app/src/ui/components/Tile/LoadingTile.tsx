import Spinner from "@components/Spinner";
import Stack from "@components/Stack";

export function LoadingTile({ className }: { className?: string }) {
  return (
    <Stack
      className={`relative size-full justify-center items-center ${className}`}
    >
      <div className="relative size-8 animate-fadein">
        <Spinner />
      </div>
    </Stack>
  );
}
