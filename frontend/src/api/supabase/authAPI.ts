import {
  LogoutResponse,
  SessionResponse,
  SignInResponse,
  SignUpResponse,
} from "../../models/auth";
import { supabase } from "./supabase";

export const signUp = async (
  email: string,
  password: string
): Promise<SignUpResponse> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  const user = data?.user || null;
  return { user, error };
};

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data?.user || null, error };
};

export const logOut = async (): Promise<LogoutResponse> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async (): Promise<SessionResponse> => {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session || null;
  return { session, error };
};
