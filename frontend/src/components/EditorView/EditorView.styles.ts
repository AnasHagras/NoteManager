import { Box, Button, TextField, Typography, styled } from "@mui/material";

export const EditorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  margin: "auto",
  width: "80%",
}));

export const EditorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const Placeholder = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(18),
  marginTop: theme.spacing(5),
}));

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const EmptyMessageContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const TitleTypography = styled(Typography)({
  marginBottom: "16px",
});

export const SaveButton = styled(Button)({
  width: "120px",
  textTransform: "none",
});

export const CancelButton = styled(Button)({
  width: "120px",
  textTransform: "none",
});
