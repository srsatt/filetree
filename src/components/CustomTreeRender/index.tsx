import { FC } from "react";
import { BaseItem } from "../../types";
import { BaseRow } from "../Tree/BaseRow";
import { RenderItem } from "../Tree/types";
import { IconNodeComponent } from "./CustomNodeRender";
import { Icon } from "./Icon";

type ItemWithIcon = BaseItem & {
  label: string;
  icon: "file1" | "file2" | "folder";
};

export const CustomTreeRender: FC<{ item: RenderItem<ItemWithIcon> }> = ({
  item,
}) => {
  if (item.type === "node") {
    return (
      <IconNodeComponent
        item={item.item}
        depth={item.depth}
        nodeState={item.nodeState}
        path={item.path}
      />
    );
  }
  return (
    <BaseRow depth={item.depth}>
      {(item.item.icon === "file1" || item.item.icon === "file2") && (
        <Icon icon={item.item.icon} />
      )}
      {item.item.label}
    </BaseRow>
  );
};
