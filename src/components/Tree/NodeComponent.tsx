import { FC, useCallback, useContext } from "react";
import styled from "styled-components";
import { BaseItem, ItemId } from "../../types";
import { BaseRow } from "./BaseRow";
import { NodeState } from "./types";
import { TreeContext } from "./useTreeContext";

export interface NodeComponentProps<
  Item extends BaseItem & { label: string } = BaseItem & { label: string }
> {
  item: Item;
  depth: number;
  path: Array<ItemId>;
  nodeState: NodeState;
}
export const NodeRow = styled(BaseRow)<{ state: NodeState }>`
  ${({ state }) =>
    state === "disabled" ? "&:hover{background-color: lightgray;}" : ""}
  ::before {
    content: "";
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    width: 6px;
    height: 6px;
    margin-right: 4px;
    transform: rotate(
      ${({ state }) =>
        state === "closed" || state === "disabled" ? "-45deg" : "45deg"}
    );
    transition: transform 0.2s;
  }
`;

export const NodeComponent: FC<NodeComponentProps> = ({
  item,
  depth,
  nodeState,
  path,
}) => {
  const { setNodeState } = useContext(TreeContext);
  const onNodeClick = useCallback(() => {
    if (nodeState === "closed") {
      setNodeState([...path, item.id], "opened");
    }
    if (nodeState === "opened") {
      setNodeState([...path, item.id], "closed");
    }
  }, [nodeState, item.id, path, setNodeState]);
  return (
    <NodeRow state={nodeState} depth={depth} onClick={onNodeClick}>
      {item.label}
    </NodeRow>
  );
};
