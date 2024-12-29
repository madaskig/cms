"use client";

import { useRef, useState } from "react";
import NewKVForm from "./NewKVForm";
import useAnimatedListInsert from "~/helpers/hooks/useAnimatedListInsert";
import type { Property } from "~/types";
import ButtonContextual from "@components/Button/ButtonContextual";
import Stack from "@components/Stack";
import LabeledInput from "@components/Input/LabeledInput";

export default function KVEditor({ list }: { list: Property[] }) {
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

  const insertedElementRef = useRef<HTMLDivElement>(null);
  const displacedElementRef = useRef<HTMLButtonElement>(null);
  const removedElementRef = useRef<HTMLButtonElement>(null);
  const containerElementRef = useRef<HTMLDivElement>(null);

  const { displacementStyles, containerStyles } = useAnimatedListInsert({
    insertedElementRef,
    // displacedElementRef,
    removedElementRef,
    containerElementRef,
    isInserted: isPopupDisplayed,
  });

  return (
    <div style={containerStyles} ref={containerElementRef}>
      <Stack>
        <Stack>
          {list.map((property) => {
            return <LabeledInput key={property.key} label={property.label} />;
          })}
        </Stack>
        <div className="relative self-stretch" style={displacementStyles}>
          <Stack direction="horizontal">
            <ButtonContextual
              context="add"
              className={`w-full flex justify-center ${isPopupDisplayed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto transition-opacity duration-500 delay-100"}`}
              size="lg"
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
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
