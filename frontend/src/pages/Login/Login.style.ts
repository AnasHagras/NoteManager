import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";

// Container to center content
export const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

// Form container with a max-width for centering the content
export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

// Title for the form
export const StyledTitle = styled(Typography)({
  textAlign: "center",
  marginBottom: "20px",
});
