import { styled } from "@mui/system";
import { Box } from "@mui/material";

// Header wrapper
export const HeaderWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
});

// Add button wrapper
export const AddButtonWrapper = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "flex-end",
});
