import { Box, Dialog, styled } from "@mui/material";

export const CDialog = styled(Dialog)(() => ({
  ".MuiPaper-root": {
    borderRadius: "30px",
  },
}));

export const AlertModalContainer = styled(Box)(({ theme }) => ({
  borderRadius: "20px",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
  width: "360px",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  backgroundColor: "#fff",
  [theme.breakpoints.down("sm")]: {
    width: "fit-content",
  },
}));

export const AlertModalTitle = styled("p")(({ theme }) => ({
  fontWeight: "bolder",
  color: theme.palette.error.main,
  fontSize: "22px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

export const AlertModalContent = styled("p")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

export const AlertModalButton = styled("div")(({ theme }) => ({
  fontSize: "17px",
  padding: "10px",
  width: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.error.main,
  "&:hover": {
    cursor: "pointer",
  },
  color: "white",
  borderRadius: "12px",
}));
