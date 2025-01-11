import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const LayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "100%",
});

export const Panel = styled(Box)<{ flex: string }>(({ flex }) => ({
  flex: flex,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRight: "1px solid #e0e0e0",
  backgroundColor: "#f9f9f9",
}));

export const ActionWrapper = styled(Box)({
  position: "absolute",
  bottom: "16px",
  right: "16px",
  zIndex: 10,
  padding: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },
});
