import React from "react";
import {
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
  SxProps,
} from "@mui/material";

interface BaseButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  sx?: SxProps;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  loading,
  sx,
  ...props
}) => {
  return (
    <Button {...props} sx={sx} disabled={loading || props.disabled}>
      {loading && (
        <CircularProgress
          size={20}
          color="inherit"
          sx={{ marginRight: "10px" }}
        />
      )}

      <Typography
        color="text.primary"
        sx={{ visibility: loading ? "hidden" : "visible" }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default BaseButton;
