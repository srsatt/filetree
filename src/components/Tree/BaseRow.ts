import styled from "styled-components";

export const BaseRow = styled.div<{ depth: number }>`
  cursor: pointer;
  height: 35px;
  display: flex;
  padding-left: ${({ depth }) => `${10 + depth * 25}px`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  float: left;
  &:hover {
    background-color: lightblue;
  }
`;
