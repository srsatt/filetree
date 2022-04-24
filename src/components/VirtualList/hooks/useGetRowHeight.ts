import { useState } from "react";

export type GetRowHeight<Item> = (item: Item, index?: number) => number;
export type GetRowHeightInput<Item> =
  | {
      rowHeight: number;
      getRowHeight?: undefined;
    }
  | {
      rowHeight?: undefined;
      getRowHeight: GetRowHeight<Item>;
    };

const getRowHeightFactory = <Item>({
  rowHeight,
  getRowHeight,
}: GetRowHeightInput<Item>): GetRowHeight<Item> => {
  if (rowHeight !== undefined) {
    return () => rowHeight;
  }
  return getRowHeight;
};
export const useGetRowHeight = <Item extends {}>(
  params: GetRowHeightInput<Item>
): GetRowHeight<Item> => {
  const [localGetRowHeight, setLocalGetRowHeight] = useState(() =>
    getRowHeightFactory(params)
  );
  const [prevParams, setPrevParams] = useState(params);
  if (
    prevParams.rowHeight !== params.rowHeight ||
    prevParams.getRowHeight !== params.getRowHeight
  ) {
    setPrevParams(params);
    setLocalGetRowHeight(() => getRowHeightFactory(params));
  }
  return localGetRowHeight;
};
