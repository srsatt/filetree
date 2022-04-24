import { Reducer, useReducer } from "react";
import { BaseItem, ItemId, Node, Tree } from "../../types";
import {
  TreeReducerState,
  TreeReducerActions,
  NodeState,
  StateTree,
  RenderItem,
  InitialState,
} from "./types";

const treeReducer = <Item extends BaseItem>(
  state: TreeReducerState<Item>,
  action: TreeReducerActions<Item>
): TreeReducerState<Item> => {
  switch (action.type) {
    case "resetTree":
      return initReducer(action.payload);
    case "changeNodeState":
      const {
        path: [firstId, ...restIds],
        newState,
      } = action.payload;
      const parentNode = state.stateTree.find((item) => item.id === firstId);

      const itemState = restIds.reduce((acc, curr): typeof parentNode => {
        const foundItem = acc?.children.find((item) => item.id === curr);
        if (foundItem) {
          return foundItem;
        }
        return undefined;
      }, parentNode);

      if (itemState) {
        itemState.state = newState;
      }
      return {
        ...state,
        nodesArray: creteNodesArray(state.tree, state.stateTree),
      };
  }
};

const getNodeState = (
  initialIsOpen: boolean,
  maxDepth: number,
  currentDepth: number
): NodeState => {
  if (maxDepth > currentDepth) {
    return initialIsOpen ? "opened" : "closed";
  }
  return "disabled";
};

const isNode = <Item extends BaseItem>(item: Item): item is Node<Item> =>
  "children" in item;

const creteStateTree = <Item extends BaseItem>(
  tree: Tree<Item>,
  initialIsOpen: boolean,
  maxDepth: number,
  currentDepth: number,
  currentPath: Array<ItemId>
): StateTree<Node<Item>> => {
  return tree.filter(isNode).map((item) => {
    return {
      id: item.id,
      state: getNodeState(initialIsOpen, maxDepth, currentDepth),
      path: currentPath,
      children:
        maxDepth > currentDepth
          ? creteStateTree(
              item.children,
              initialIsOpen,
              maxDepth,
              currentDepth + 1,
              [...currentPath, item.id]
            )
          : [],
    };
  });
};

const creteNodesArray = <Item extends BaseItem>(
  tree: Tree<Item>,
  stateTree: StateTree<Node<Item>>
): Array<RenderItem<Item>> => {
  const result: Array<RenderItem<Item>> = [];
  const iterate = (
    tree: Tree<Item>,
    stateTree: StateTree<Node<Item>>,
    depth: number
  ): void => {
    tree.forEach((item) => {
      if ("children" in item) {
        const itemState = stateTree.find(
          (stateItem) => stateItem.id === item.id
        );
        if (itemState === undefined) {
          throw new Error("invalidItem in tree");
        }
        result.push({
          item,
          type: "node",
          nodeState: itemState.state,
          depth,
          path: itemState.path,
        });

        if (itemState.state === "opened") {
          iterate(item.children, itemState.children, depth + 1);
        }
        return;
      }

      result.push({ item, type: "leaf", depth });
    });
  };
  iterate(tree, stateTree, 0);

  return result;
};

const initReducer = <Item extends BaseItem>({
  tree,
  depth,
  initialIsOpen,
}: InitialState<Item>): TreeReducerState<Item> => {
  const stateTree = creteStateTree(tree, initialIsOpen, depth, 0, []);
  return {
    tree,
    depth,
    stateTree,
    // nodesArray: [],
    nodesArray: creteNodesArray(tree, stateTree),
  };
};

export const useTreeReducer = <Item extends BaseItem>(
  tree: Tree<Item>,
  depth: number,
  initialIsOpen: boolean
) =>
  useReducer<
    Reducer<TreeReducerState<Item>, TreeReducerActions<Item>>,
    InitialState<Item>
  >(treeReducer, { tree, depth, initialIsOpen }, (initState) =>
    initReducer(initState)
  );
