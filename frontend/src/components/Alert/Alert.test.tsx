import { render, screen } from "@testing-library/react";
import CAlertModal from "./Alert";

const mockSetOpen = jest.fn();

describe("CAlertModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    render(
      <CAlertModal
        title="Test Title"
        content="Test Content"
        buttonText="Click Me"
        open={true}
        setOpen={mockSetOpen}
        closeOnEscape={true}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <CAlertModal
        title="Test Title"
        content="Test Content"
        buttonText="Click Me"
        open={false}
        setOpen={mockSetOpen}
        closeOnEscape={true}
      />
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  });
});
