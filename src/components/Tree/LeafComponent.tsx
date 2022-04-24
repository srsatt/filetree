import { FC } from "react";
import { BaseItem } from "../../types";
import { BaseRow } from "./BaseRow";

export interface LeafComponentProps<LeafItem extends BaseItem> {
  item: LeafItem;
  depth: number;
}

export const LeafComponent = ({
  item,
  depth,
}: LeafComponentProps<BaseItem & { label: string }>): ReturnType<
  FC<LeafComponentProps<BaseItem & { label: string }>>
> => {
  return <BaseRow depth={depth}>Leaf {item.label}</BaseRow>;
};
