import React, { useState } from "react";
import MainLayout from "./components/Layout/MainLayout";
import TreeView from "./components/TreeView/TreeView";
import EditorPanel from "./components/EditorView/EditorView";

const App: React.FC = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState("1 0 30%");
  const [rightPanelWidth, setRightPanelWidth] = useState("2 0 70%");

  const handleResizePanel = () => {
    setLeftPanelWidth(leftPanelWidth === "1 0 30%" ? "1 0 30%" : "1 0 30%");
    setRightPanelWidth(rightPanelWidth === "2 0 70%" ? "2 0 70%" : "2 0 70%");
  };

  return (
    <MainLayout
      treeView={<TreeView />}
      editorPanel={<EditorPanel />}
      onResizePanel={handleResizePanel}
    />
  );
};

export default App;
