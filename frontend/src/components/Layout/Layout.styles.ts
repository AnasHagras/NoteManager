import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const LayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "100vh", // Full viewport height
  width: "100%", // Full width
});

export const Panel = styled(Box)<{ flex: string }>(({ flex }) => ({
  flex: flex, // Dynamic flex for resizing
  overflow: "auto", // Handle overflow for content scrolling
  display: "flex",
  flexDirection: "column",
  position: "relative", // To position ActionWrapper
  borderRight: "1px solid #e0e0e0", // Divider between panels
  backgroundColor: "#f9f9f9", // Subtle background color
}));

export const ActionWrapper = styled(Box)({
  position: "absolute",
  bottom: "16px", // Increased spacing for better aesthetics
  right: "16px", // Increased spacing for better aesthetics
  zIndex: 10,
  padding: "8px", // Optional padding for internal spacing
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for visibility
  borderRadius: "8px", // Rounded corners for a modern look
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
  transition: "transform 0.2s ease-in-out", // Smooth hover animation

  "&:hover": {
    transform: "scale(1.05)", // Slightly enlarge on hover
  },
});
