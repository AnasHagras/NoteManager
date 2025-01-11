import { render, screen } from "@testing-library/react";
import MainLayout from "./MainLayout";

const mockTreeView = <div>Tree View</div>;
const mockEditorPanel = <div>Editor Panel</div>;

describe("MainLayout", () => {
  it("renders treeView and editorPanel correctly", () => {
    render(
      <MainLayout treeView={mockTreeView} editorPanel={mockEditorPanel} />
    );

    const treeViewElement = screen.getByText("Tree View");
    expect(treeViewElement).toBeInTheDocument();

    const editorPanelElement = screen.getByText("Editor Panel");
    expect(editorPanelElement).toBeInTheDocument();

    const leftPanel = treeViewElement.closest("div");
    const rightPanel = editorPanelElement.closest("div");

    expect(leftPanel).toHaveStyle("flex: 1 0 20%");
    expect(rightPanel).toHaveStyle("flex: 2 0 80%");
  });

  it("renders without actions when showActions is not provided", () => {
    render(
      <MainLayout treeView={mockTreeView} editorPanel={mockEditorPanel} />
    );
  });

  it("renders with actions when showActions is true", () => {
    render(
      <MainLayout
        treeView={mockTreeView}
        editorPanel={mockEditorPanel}
        showActions={true}
      />
    );
  });
});
