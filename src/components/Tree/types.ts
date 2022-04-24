import { FC } from "react";
import { BaseItem, ItemId, Tree, Node } from "../../types";

export type TreeComponentProps<Item extends BaseItem> = {
  tree: Tree<Item>;
  maxRenderDepth: number;
  nodesState?: { opened: boolean };
} & (
  | {
      renderRow: FC<{ item: RenderItem<Item> }>;
      getRowHeight: (item: RenderItem<Item>) => number;
    }
  | {
      renderRow?: never;
      getRowHeight?: never;
    }
);

export type NodeState = "opened" | "closed" | "disabled";

export type RenderItem<Item extends BaseItem> = {
  depth: number;
} & (
  | {
      type: "node";
      item: Node<Item>;
      nodeState: NodeState;
      path: Array<ItemId>;
    }
  | { item: Item; type: "leaf" }
);

export type InitialState<Item extends BaseItem> = {
  tree: Tree<Item>;
  depth: number;
  initialIsOpen: boolean;
};

export type StateTree<Item extends Node<BaseItem>> = Array<
  Pick<Item, "id"> & {
    state: NodeState;
    children: StateTree<Item>;
    path: Array<ItemId>;
  }
>;

export type TreeReducerState<Item extends BaseItem> = {
  tree: Tree<Item>;
  stateTree: StateTree<Node<Item>>;
  nodesArray: Array<RenderItem<Item>>;
  depth: number;
};

export type TreeReducerActions<Item extends BaseItem> =
  | {
      type: "resetTree";
      payload: { tree: Tree<Item>; depth: number; initialIsOpen: boolean };
    }
  | {
      type: "changeNodeState";
      payload: {
        path: Array<ItemId>;
        newState: NodeState;
      };
    };
