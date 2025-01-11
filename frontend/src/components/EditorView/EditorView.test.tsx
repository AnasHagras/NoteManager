import { render, screen, waitFor } from "@testing-library/react";
import EditorView from "./EditorView";
import { useTreeStore } from "../../store";

jest.mock("../../store", () => ({
  useTreeStore: jest.fn(),
}));

describe("EditorView", () => {
  const mockEditNode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTreeStore as unknown as jest.Mock).mockImplementation(() => ({
      tree: [
        { id: "1", title: "Root", type: "folder" },
        { id: "2", title: "Note 1", type: "note", content: "Note 1 Content" },
      ],
      lastOpenedEditId: "2",
      lastOpenedNoteId: "2",
      editNode: mockEditNode,
    }));
  });

  it("renders editor when a note is selected", async () => {
    render(<EditorView />);

    await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());

    expect(screen.getByLabelText("Title")).toHaveValue("Note 1");
    expect(screen.getByLabelText("Content")).toHaveValue("Note 1 Content");
  });
});
