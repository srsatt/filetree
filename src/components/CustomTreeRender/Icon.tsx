import { FC } from "react";

import file1Icon from "../../assets/icons/file-solid.svg";
import file2Icon from "../../assets/icons/file-circle-check-solid.svg";
import folderOpenedIcon from "../../assets/icons/folder-open-solid.svg";
import folderClosedIcon from "../../assets/icons/folder-closed-solid.svg";
import styled from "styled-components";

type IconProps = {
  icon: "file1" | "file2" | "folder-opened" | "folder-closed";
  className?: string;
};

const iconMapping = {
  file1: file1Icon,
  file2: file2Icon,
  "folder-opened": folderOpenedIcon,
  "folder-closed": folderClosedIcon,
};

const Img = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;
export const Icon: FC<IconProps> = ({ icon, className }) => {
  return <Img className={className} src={iconMapping[icon]} />;
};
