import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";

export default function useAnimatedListInsert({
  insertedElementRef,
  removedElementRef,
  containerElementRef,
  isInserted,
  animationDuration = "0.4s",
}: {
  insertedElementRef: RefObject<HTMLUnknownElement | null>;
  removedElementRef: RefObject<HTMLUnknownElement | null>;
  containerElementRef: RefObject<HTMLUnknownElement | null>;
  isInserted: boolean;
  animationDuration?: string;
}) {
  const [insertedElementHeight, setInsertedElementHeight] = useState(0);
  const [removedElementHeight, setRemovedElementHeight] = useState(0);
  const [containerElementHeight, setContainerElementHeight] = useState(0);

  const isInsertedRef = useRef(isInserted);

  useEffect(() => {
    // captures "isInserted" in a ref so it can be read in "handleResize"
    isInsertedRef.current = isInserted;
  }, [isInserted]);

  useEffect(() => {
    const handleResize = () => {
      const insertedElementHeightMeasured =
        insertedElementRef.current?.offsetHeight || 0;

      const removedElementHeightMeasured =
        removedElementRef.current?.offsetHeight || 0;

      const containerElementHeightMeasured =
        containerElementRef.current?.offsetHeight || 0;

      setInsertedElementHeight(insertedElementHeightMeasured);
      setRemovedElementHeight(removedElementHeightMeasured);
      setContainerElementHeight(
        containerElementHeightMeasured
          ? containerElementHeightMeasured +
              (isInsertedRef.current
                ? removedElementHeightMeasured - insertedElementHeightMeasured
                : 0)
          : 0,
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displacementStyles = useMemo<React.CSSProperties>(() => {
    if (isInserted) {
      return {
        transform: `translate3d(0, ${insertedElementHeight}px, 0)`,
        transition: `transform ${animationDuration} 0.02s`,
      };
    } else {
      return {
        transform: "translate3d(0, 0, 0)",
        transition: `transform ${animationDuration}`,
      };
    }
  }, [isInserted, insertedElementHeight]);

  const containerStyles = useMemo<React.CSSProperties>(() => {
    if (isInserted) {
      return {
        height: `${containerElementHeight + insertedElementHeight - removedElementHeight}px`,
        transition: `height ${animationDuration}`,
      };
    } else {
      return {
        height: containerElementHeight || undefined,
        transition: `height ${animationDuration} 0.02s`,
      };
    }
  }, [
    isInserted,
    containerElementHeight,
    insertedElementHeight,
    removedElementHeight,
  ]);

  return {
    displacementStyles,
    containerStyles,
  };
}
