import { createContext, useContext } from "react";
import { ItemId } from "../../types";
import { NodeState } from "./types";

export const TreeContext = createContext({
  setNodeState: (path: Array<ItemId>, newState: NodeState) => {},
});

export const useTreeContext = () => {
  useContext<{
    setNodeState: (path: Array<ItemId>, newState: NodeState) => void;
  }>(TreeContext);
};
