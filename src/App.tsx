import "./App.css";
import styled from "styled-components";
import { TreeComponent } from "./components/Tree";
import { FC, useCallback, useState } from "react";
import { CustomTreeRender } from "./components/CustomTreeRender";

// заранее сохраненное дерево
// если раскрыть весь список, то число элементов будет ~50000
const fileTree = require("./tree.json");

const ListWrapper = styled.div`
  width: 300px;
  height: 100%;
  border: 1px solid gray;
`;

const Text = styled.div`
  width: 300px;
  text-align: left;
`;

const Example = styled.div`
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
`;

const ButtonPanel = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  margin: 8px;
`;

//Пример обычного рендера дерева
const DefaultTreeExample: FC = () => {
  const [nodesState, setNodesState] = useState({ opened: false });
  return (
    <Example>
      <Text>
        Пример стандартного рендеринга дерева. Если открыть все ноды, то число
        элементов будет ~50000
      </Text>
      <ButtonPanel>
        <Button onClick={() => setNodesState({ opened: true })}>
          Открыть все ноды
        </Button>
        <Button onClick={() => setNodesState({ opened: false })}>
          Закрыть все ноды
        </Button>
      </ButtonPanel>
      <ListWrapper>
        <TreeComponent
          tree={fileTree}
          maxRenderDepth={3}
          nodesState={nodesState}
        />
      </ListWrapper>
    </Example>
  );
};

//Пример рендера кастомного дерева, в котором у нод есть еще поле icon, в зависимости от которого изменяется тип иконки
const CustomRenderTreeExample: FC = () => {
  const [nodesState, setNodesState] = useState({ opened: false });
  const getRowHeight = useCallback(() => 35, []);
  return (
    <Example>
      <Text>
        Пример кастомизации рендеринга для дерева, в котором у элементов есть
        поле icon
      </Text>
      <ButtonPanel>
        <Button onClick={() => setNodesState({ opened: true })}>
          Открыть все ноды
        </Button>
        <Button onClick={() => setNodesState({ opened: false })}>
          Закрыть все ноды
        </Button>
      </ButtonPanel>
      <ListWrapper>
        <TreeComponent
          renderRow={CustomTreeRender}
          getRowHeight={getRowHeight}
          tree={fileTree}
          maxRenderDepth={3}
          nodesState={nodesState}
        />
      </ListWrapper>
    </Example>
  );
};
function App() {
  return (
    <>
      <div className="App">
        <DefaultTreeExample />
        <CustomRenderTreeExample />
      </div>
    </>
  );
}

export default App;
