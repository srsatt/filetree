import { FC, useCallback, useState } from "react";
import { BaseItem, ItemId } from "../../types";
import { VirtualList } from "../VirtualList";
import { LeafComponent } from "./LeafComponent";
import { NodeComponent } from "./NodeComponent";
import { NodeState, RenderItem, TreeComponentProps } from "./types";
import { TreeContext } from "./useTreeContext";
import { useTreeReducer } from "./useTreeReducer";

export const defaultRenderer = <Item extends BaseItem & { label: string }>({
  item,
}: {
  item: RenderItem<Item>;
}) => {
  if (item.type === "node") {
    return (
      <NodeComponent
        item={item.item}
        depth={item.depth}
        nodeState={item.nodeState}
        path={item.path}
      />
    );
  }
  return <LeafComponent item={item.item} depth={item.depth} />;
};

const isLabeledItem = <Item extends BaseItem>(
  item: Item
): item is Item & { label: string } =>
  "label" in item && typeof Reflect.get(item, "label") === "string";

export const TreeComponent = <Item extends BaseItem>({
  tree,
  maxRenderDepth,
  nodesState,
  renderRow,
  getRowHeight,
}: TreeComponentProps<Item>): ReturnType<FC<TreeComponentProps<Item>>> => {
  const [{ nodesArray }, dispatch] = useTreeReducer(
    tree,
    maxRenderDepth,
    nodesState?.opened || false
  );

  const [prevProps, setPrevProps] = useState({
    tree,
    maxRenderDepth,
    nodesState,
  });
  if (
    prevProps.tree !== tree ||
    prevProps.maxRenderDepth !== maxRenderDepth ||
    prevProps.nodesState !== nodesState
  ) {
    setPrevProps({
      tree,
      maxRenderDepth,
      nodesState,
    });
    dispatch({
      type: "resetTree",
      payload: {
        tree,
        depth: maxRenderDepth,
        initialIsOpen: nodesState?.opened ?? false,
      },
    });
  }

  const setNodeState = useCallback(
    (path: Array<ItemId>, newState: NodeState) => {
      dispatch({ type: "changeNodeState", payload: { path, newState } });
    },
    [dispatch]
  );

  if (renderRow) {
    return (
      <TreeContext.Provider value={{ setNodeState }}>
        <VirtualList
          items={nodesArray}
          renderer={renderRow}
          getRowHeight={getRowHeight}
          getKey={(item) => item.item.id}
          overScanItems={10}
        />
      </TreeContext.Provider>
    );
  }

  if (nodesArray.every(({ item }) => isLabeledItem(item))) {
    const typedNodesArray = nodesArray as Array<
      RenderItem<Item & { label: string }>
    >;

    return (
      <TreeContext.Provider value={{ setNodeState }}>
        <VirtualList<RenderItem<Item & { label: string }>>
          items={typedNodesArray}
          renderer={defaultRenderer}
          getRowHeight={getRowHeight}
          getKey={(item) => item.item.id}
          rowHeight={35}
          overScanItems={10}
        />
      </TreeContext.Provider>
    );
  }
  throw new Error("No renderer is present or some elements has no label");
};
