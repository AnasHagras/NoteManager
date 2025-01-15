import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { useAuthStore } from "../../store/useAuthStore";
import { StyledContainer, StyledForm, StyledTitle } from "./Register.style";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../utils/toastHelper";

const Register = () => {
  const { loading, signUp, getSession } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signUp(email, password);
    const email_verified = response.user?.user_metadata.email_verified || false;
    if (response.error) {
      toast.error(response.error.message, defaultToastOptions);
    } else {
      if (!email_verified) {
        toast.success(
          "Please check your email for verification link.",
          defaultToastOptions
        );
      } else if (email_verified) {
        toast.error("User already exists", defaultToastOptions);
      }

      // console.log("Register successful response: ", response);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const sessionResponse = await getSession();
      if (sessionResponse.session) {
        navigate("/");
      }
    };

    checkSession();
  }, [getSession, navigate]);

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle variant="h4">Register</StyledTitle>
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register"
          )}
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "16px", textAlign: "center" }}
        >
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
