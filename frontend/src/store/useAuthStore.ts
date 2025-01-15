import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import {
  handleSignUp,
  handleSignIn,
  handleLogOut,
  handleGetSession,
  isAuthenticated,
} from "../services/supabase/authServices";
import {
  LogoutResponse,
  SessionResponse,
  SignUpResponse,
  SignInResponse,
} from "../models/auth";
import { useTreeStore } from "./useTreeStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string) => Promise<SignUpResponse>;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  logout: () => Promise<LogoutResponse>;
  getSession: () => Promise<SessionResponse>;
  checkAuthentication: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  signUp: async (email, password) => {
    set({ loading: true });
    const response = await handleSignUp(email, password);
    if (response.error) {
      set({ loading: false, user: null });
      console.error("Sign Up Error:", response.error.message);
    } else {
      set({ user: response.user, loading: false });
    }
    return response;
  },

  signIn: async (email, password) => {
    set({ loading: true });
    const response = await handleSignIn(email, password);
    if (response.error) {
      set({ loading: false });
      console.error("Sign In Error:", response.error.message);
    } else {
      set({ user: response.user, loading: false });
    }
    return response;
  },

  logout: async () => {
    set({ loading: true });
    const response = await handleLogOut();
    if (response.error) {
      set({ loading: false });
      console.error("Logout Error:", response.error.message);
    } else {
      const clearTreeData = useTreeStore.getState().clearData;
      clearTreeData();
      set({ user: null, loading: false });
    }
    return response;
  },

  getSession: async () => {
    set({ loading: true });
    const response = await handleGetSession();
    if (response.error) {
      set({ loading: false });
      console.error("Get Session Error:", response.error.message);
    } else {
      set({ user: response.session?.user || null, loading: false });
    }
    return response;
  },

  checkAuthentication: async () => {
    const isAuth = await isAuthenticated();
    return isAuth;
  },
}));
