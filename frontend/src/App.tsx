import React, { useEffect, useState } from "react";
import MainLayout from "./components/Layout/MainLayout";
import TreeView from "./components/TreeView/TreeView";
import EditorPanel from "./components/EditorView/EditorView";
import { fetchNodes } from "./api/supabase/treeAPI";
import { buildTree } from "./services/supabase/treeService";

const App: React.FC = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState("1 0 30%");
  const [rightPanelWidth, setRightPanelWidth] = useState("2 0 70%");

  useEffect(() => {
    const fetchTree = async () => {
      await fetchNodes()
        .then((response) => {
          if (response.success) {
            buildTree().then((tree) => {
              // console.log("Tree data:", tree);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching tree:", error);
        });
    };

    fetchTree();
  }, []);

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
