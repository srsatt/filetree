import React, { FC, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useElementHeight } from "../../utils/hooks/useElementHeight";
import { GetRowHeightInput, useGetRowHeight } from "./hooks/useGetRowHeight";
import { useVirtualListBreaks } from "./hooks/useVirtualListBreaks";
import { useVirtualListIndexes } from "./hooks/useVirualListIndexes";

type VirtualListProps<Item> = {
  items: Array<Item>;
  renderer: FC<{ item: Item }>;
  getKey: (item: Item) => string;
  overScanItems?: number;
} & GetRowHeightInput<Item>;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const Scroller = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const DEFAULT_OVERSCAN_ITEMS = 10;

export const VirtualList = <Item extends {}>({
  items,
  renderer,
  getKey,
  overScanItems,
  ...getRowHeightParams
}: VirtualListProps<Item>): ReturnType<FC<VirtualListProps<Item>>> => {
  const [scroll, setScroll] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getRowHeight = useGetRowHeight<Item>(getRowHeightParams);
  const breaks = useVirtualListBreaks(items, getRowHeight);
  const height = useElementHeight(wrapperRef);

  const [startIndex, endIndex] = useVirtualListIndexes({
    scroll,
    height,
    breaks,
    overscanItems: overScanItems ?? DEFAULT_OVERSCAN_ITEMS,
  });

  const onWrapperScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    ({ target }) => {
      const divTarget = target as HTMLDivElement;
      setScroll(divTarget.scrollTop);
    },
    []
  );

  return (
    <Wrapper ref={wrapperRef} onScroll={onWrapperScroll}>
      <Scroller height={breaks[breaks.length - 1] || 0}>
        <Content
          style={{
            transform: `translateY(${
              startIndex > 1 ? breaks[startIndex - 1] : 0
            }px)`,
          }}
        >
          {items
            .slice(startIndex, endIndex)
            .map((item) =>
              React.createElement(renderer, { item, key: getKey(item) })
            )}
        </Content>
      </Scroller>
    </Wrapper>
  );
};
