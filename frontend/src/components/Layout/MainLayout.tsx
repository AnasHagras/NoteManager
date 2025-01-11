import React from "react";
import { Panel, LayoutContainer } from "./Layout.styles";

interface MainLayoutProps {
  treeView: React.ReactNode;
  editorPanel: React.ReactNode;
  onResizePanel?: () => void;
  showActions?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ treeView, editorPanel }) => {
  return (
    <LayoutContainer>
      {/* Left Panel: TreeView */}
      <Panel flex="1 0 20%">{treeView}</Panel>

      {/* Right Panel: Editor */}
      <Panel flex="2 0 80%">{editorPanel}</Panel>
    </LayoutContainer>
  );
};

export default MainLayout;
