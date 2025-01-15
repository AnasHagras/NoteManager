import { createContext } from "react";

export interface AuthContextType {
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
