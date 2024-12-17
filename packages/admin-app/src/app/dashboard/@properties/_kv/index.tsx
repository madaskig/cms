"use client";

import { useRef, useState } from "react";
import AddButton from "~/components/AddButton";
import NewKVForm from "./NewKVForm";
import useAnimatedListInsert from "~/helpers/hooks/useAnimatedListInsert";
import type { Property } from "~/types";

export default function KVEditor({ list }: { list: Property[] }) {
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

  const insertedElementRef = useRef<HTMLDivElement>(null);
  const displacedElementRef = useRef<HTMLButtonElement>(null);
  const removedElementRef = useRef<HTMLButtonElement>(null);
  const containerElementRef = useRef<HTMLUListElement>(null);

  const { displacementStyles, containerStyles } = useAnimatedListInsert({
    insertedElementRef,
    // displacedElementRef,
    removedElementRef,
    containerElementRef,
    isInserted: isPopupDisplayed,
  });

  return (
    <ul
      className="relative w-full flex flex-col gap-2"
      style={containerStyles}
      ref={containerElementRef}
    >
      {list.map((property) => {
        return (
          <li
            key={property.key}
            className="relative w-full rounded-md bg-gray-100 p-2 space-y-2"
          >
            <span className="block w-full text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {property.label}
            </span>
            <input className="block w-full bg-white rounded-md text-sm p-1"></input>
          </li>
        );
      })}
      <div className="relative self-stretch" style={displacementStyles}>
        <AddButton
          className={`w-full ${isPopupDisplayed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto transition-opacity duration-500 delay-100"}`}
          onClick={() => {
            setIsPopupDisplayed(true);
          }}
          ref={removedElementRef}
        />
        <div
          className={`absolute ${isPopupDisplayed ? "opacity-100 pointer-events-auto transition-opacity duration-500 delay-200" : "opacity-0 pointer-events-none"} w-full left-0 right-0 bottom-full`}
          ref={insertedElementRef}
        >
          <NewKVForm
            onCancel={() => {
              setIsPopupDisplayed(false);
            }}
          />
        </div>
      </div>
    </ul>
  );
}
