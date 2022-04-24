import { FC, useContext, useCallback } from "react";
import styled from "styled-components";
import { BaseItem } from "../../types";
import { BaseRow } from "../Tree/BaseRow";
import { NodeComponentProps } from "../Tree/NodeComponent";
import { NodeState } from "../Tree/types";
import { TreeContext } from "../Tree/useTreeContext";
import { Icon } from "./Icon";

export const NodeRow = styled(BaseRow)<{ state: NodeState }>`
  ${({ state }) =>
    state === "disabled" ? "&:hover{background-color: lightgray;}" : ""}
`;
export const IconNodeComponent: FC<
  NodeComponentProps<
    BaseItem & { label: string; icon: "file1" | "file2" | "folder" }
  >
> = ({ item, depth, nodeState, path }) => {
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
      {item.icon === "folder" && (
        <Icon
          icon={nodeState === "opened" ? "folder-opened" : "folder-closed"}
        />
      )}
      {item.label}
    </NodeRow>
  );
};
