import { Box, Button, styled } from "@mui/material";

export const TreeViewFooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

export const TreeViewFooterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "5px",
  border: "none",
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  width: "80%",
  marginBottom: theme.spacing(2),
}));
