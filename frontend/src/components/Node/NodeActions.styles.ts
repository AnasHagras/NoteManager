import { Button, Box } from "@mui/material";
import { styled } from "@mui/system";

export const NodeActionsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "10px",
});

export const ActionButton = styled(Button)<{ color?: "primary" | "secondary" }>(
  ({ color }) => ({
    margin: "10px 0",
    padding: "10px 15px",
    width: "100%",
    textAlign: "center",
    backgroundColor:
      color === "primary"
        ? "#1976d2"
        : color === "secondary"
        ? "#d32f2f"
        : "#e0e0e0",
    "&:hover": {
      backgroundColor:
        color === "primary"
          ? "#1565c0"
          : color === "secondary"
          ? "#c62828"
          : "#bdbdbd",
    },
  })
);

export const CollapseArrow = styled("span")<{ isCollapsed?: boolean }>(
  ({ isCollapsed }) => ({
    display: "inline-block",
    transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
    transition: "transform 0.3s ease-in-out",
    marginRight: "5px",
  })
);
