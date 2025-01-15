import { render, screen } from "@testing-library/react";
import BreadCrumb from "./BreadCrumb";
import { getPathToNode } from "../../utils/TreeUtils";

jest.mock("../../utils/helper", () => ({
  getPathToNode: jest.fn(),
}));

describe("BreadCrumb", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the breadcrumb items correctly", () => {
    const mockPath = [
      { id: "1", title: "Root" },
      { id: "2", title: "Folder" },
      { id: "3", title: "Note" },
    ];

    (getPathToNode as jest.Mock).mockReturnValue(mockPath);

    render(<BreadCrumb nodeId="3" />);

    mockPath.forEach((node) => {
      expect(screen.getByText(node.title)).toBeInTheDocument();
    });
  });
});
