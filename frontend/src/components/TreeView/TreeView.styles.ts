import { styled } from "@mui/system";

export const TreeWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const NodeContainer = styled("div")({
  marginBottom: "10px",
});

export const NodeTitle = styled("span")<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    fontWeight: isSelected ? "bold" : "normal",
    color: isSelected ? "blue" : "black",
  })
);

export const EditorWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
});

export const TextInput = styled("input")({
  marginBottom: "10px",
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

export const TextArea = styled("textarea")({
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  minHeight: "100px",
});

export const Button = styled("button")({
  padding: "5px 10px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export const LoadingMessage = styled("div")({
  fontSize: "16px",
  color: "#888",
});
