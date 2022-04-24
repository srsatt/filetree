import { Tree, ItemId } from "../types";

export const createFolder = (
  prefix: string,
  folderCount: number,
  filesCount: number,
  depth: number
): Tree => {
  return [
    ...[...new Array(folderCount)].map((_, index) => ({
      id: `${prefix}-f-${index}` as ItemId,
      label: `${prefix}-f-${index}`,
      icon: "folder",
      children: depth
        ? createFolder(
            `${prefix}-f-${index}`,
            folderCount,
            filesCount,
            depth - 1
          )
        : [],
    })),
    ...[...new Array(filesCount)].map((_, index) => ({
      id: `${prefix}-file-${index}` as ItemId,
      label: `${prefix}-file-${index}`,
      icon: "file",
    })),
  ];
};
