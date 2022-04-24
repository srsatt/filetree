import { useState } from "react";
import { GetRowHeight } from "./useGetRowHeight";

const getBreaks = <Item>(
  items: Array<Item>,
  getRowHeight: GetRowHeight<Item>
): Array<number> => {
  const breaks: Array<number> = [];
  let offset = 0;
  items.forEach((item, index) => {
    offset += getRowHeight(item, index);
    breaks.push(offset);
  });
  return breaks;
};

export const useVirtualListBreaks = <Item>(
  items: Array<Item>,
  getRowHeight: GetRowHeight<Item>
): Array<number> => {
  const [prevParams, setPrevParams] = useState({ items, getRowHeight });
  const [breaks, setBreaks] = useState(getBreaks(items, getRowHeight));

  if (prevParams.items !== items || prevParams.getRowHeight !== getRowHeight) {
    setPrevParams({ items, getRowHeight });
    setBreaks(getBreaks(items, getRowHeight));
  }
  return breaks;
};
