import { useState } from "react";

interface UseVirtualListIndexesProps {
  breaks: Array<number>;
  overscanItems: number;
  scroll: number;
  height: number;
}

const findBreakIndex = (
  direction: "start" | "end",
  breaks: Array<number>,
  overscanItems: number,
  scroll: number,
  height: number
): number => {
  if (direction === "start") {
    const minIndex = breaks.findIndex((breakpoint) => breakpoint > scroll) - 1;
    return Math.max(0, minIndex - overscanItems);
  }

  const maxIndex = breaks.findIndex(
    (breakpoint) => breakpoint > scroll + height
  );

  if (maxIndex === -1) {
    return breaks.length; //весь лист помещается на экран
  }
  return Math.min(breaks.length - 1, maxIndex + overscanItems);
};

export const useVirtualListIndexes = ({
  scroll,
  height,
  breaks,
  overscanItems,
}: UseVirtualListIndexesProps): [number, number] => {
  const [startIndex, setStartIndex] = useState(
    findBreakIndex("start", breaks, overscanItems, scroll, height)
  );
  const [endIndex, setEndIndex] = useState(
    findBreakIndex("end", breaks, overscanItems, scroll, height)
  );
  const [prevParams, setPrevParams] = useState({
    scroll,
    height,
    breaks,
    overscanItems,
  });

  if (
    prevParams.breaks !== breaks ||
    prevParams.scroll !== scroll ||
    prevParams.height !== height ||
    prevParams.overscanItems !== overscanItems
  ) {
    setPrevParams({
      scroll,
      height,
      breaks,
      overscanItems,
    });

    setStartIndex(
      findBreakIndex("start", breaks, overscanItems, scroll, height)
    );
    setEndIndex(findBreakIndex("end", breaks, overscanItems, scroll, height));
  }

  return [startIndex, endIndex];
};
