import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Box, CircularProgress } from "@mui/material";
import { defaultToastOptions } from "../utils/toastHelper";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, getSession } = useAuthStore((state) => state);
  const [toastShown, setToastShown] = useState(false);
  useEffect(() => {
    if (loading) {
      getSession();
    }
  }, [loading, getSession]);

  useEffect(() => {
    if (!user && !loading && !toastShown) {
      toast.error("Please login first.", defaultToastOptions);
      setToastShown(true);
    }
  }, [user, loading, toastShown]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
