import MainLayout from "../components/Layout/MainLayout";
import TreeView from "../components/TreeView/TreeView";
import EditorView from "../components/EditorView/EditorView";

const MainPanel = () => {
  return <MainLayout treeView={<TreeView />} editorPanel={<EditorView />} />;
};

export default MainPanel;
