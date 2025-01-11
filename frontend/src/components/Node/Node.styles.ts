import { styled } from "@mui/system";
import theme from "../../styles/theme";

export const NodeTitle = styled("div")<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    fontWeight: isSelected ? "bold" : "normal",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "4px",
    color: isSelected ? "#ffffff" : "#333333",
    backgroundColor: isSelected ? theme.palette.primary.main : "transparent",
    transition: "all 0.3s ease",
    "&:active": {
      backgroundColor: isSelected ? theme.palette.primary.light : "#e0e0e0",
      transform: "scale(0.98)",
    },
  })
);

export const EditorWrapper = styled("div")({
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
});

export const Button = styled("button")({
  padding: "5px 10px",
  margin: "5px 0",
  cursor: "pointer",
});
