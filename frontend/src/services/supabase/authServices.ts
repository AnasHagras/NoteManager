import { signUp, signIn, logOut, getSession } from "../../api/supabase/authAPI";
import {
  SignUpResponse,
  SignInResponse,
  SessionResponse,
  LogoutResponse,
} from "../../models/auth";

export const handleSignUp = async (
  email: string,
  password: string
): Promise<SignUpResponse> => {
  const { user, error } = await signUp(email, password);

  if (error) {
    return { user: null, error };
  }

  return { user, error };
};

export const handleSignIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const { user, error } = await signIn(email, password);

  if (error) {
    // console.error("Sign In Error:", error.message);
    return { user: null, error };
  }

  return { user, error };
};

export const handleLogOut = async (): Promise<LogoutResponse> => {
  const { error } = await logOut();

  if (error) {
    // console.error("Logout Error:", error.message);
  }

  return { error };
};

export const handleGetSession = async (): Promise<SessionResponse> => {
  const { session, error } = await getSession();

  if (error) {
    // console.error("Get Session Error:", error.message);
  }

  return { session, error };
};

export const isAuthenticated = async (): Promise<boolean> => {
  const { session } = await handleGetSession();
  return session !== null;
};
