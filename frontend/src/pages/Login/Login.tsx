import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { useAuthStore } from "../../store/useAuthStore";
import { StyledContainer, StyledForm, StyledTitle } from "./Login.style";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../utils/toastHelper";
import { handleGetSession } from "../../services/supabase/authServices";

const Login = () => {
  const { signIn, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password).then((res) => {
      if (!res.error && res.user) {
        toast.success("Login successful", defaultToastOptions);
        navigate("/");
      } else {
        toast.error(res.error?.message, defaultToastOptions);
      }
    });
  };

  useEffect(() => {
    const checkSession = async () => {
      const sessionResponse = await handleGetSession();
      if (sessionResponse.session) {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle variant="h4">Login</StyledTitle>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "16px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "16px", textAlign: "center" }}
        >
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
