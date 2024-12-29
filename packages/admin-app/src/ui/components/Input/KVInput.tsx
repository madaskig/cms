import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Stack from "@components/Stack";

export type Props = {
  kProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  vProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

export default function KVInput({ kProps, vProps }: Props) {
  return (
    <Stack spacing="xs">
      <Stack
        direction="horizontal"
        spacing="sm"
        className="items-center bg-gray-100 px-1 py-1"
      >
        <div className="flex">
          <span className="text-[0.65rem] uppercase font-bold opacity-70">
            key:{" "}
          </span>
        </div>
        <input className=" w-full text-sm " {...kProps}></input>
      </Stack>

      <Stack
        direction="horizontal"
        spacing="sm"
        className="items-center bg-gray-200 px-1 py-1"
      >
        <div className="flex ">
          <span className="text-[0.65rem] uppercase font-bold opacity-70">
            value:{" "}
          </span>
        </div>
        <input className="w-full text-sm " {...vProps}></input>
      </Stack>
    </Stack>
  );
}
