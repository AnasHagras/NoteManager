import { useEffect, useState, ReactNode } from "react";
import { supabase } from "../api/supabase/supabase";
import { useAuthStore } from "../store/useAuthStore";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setStoreLoading = useAuthStore((state) => state.setLoading);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        setUser(data?.session?.user || null);
      } catch {
        // console.error("Error fetching session:", error);
      } finally {
        setLocalLoading(false);
        setStoreLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setStoreLoading(false);
      }
    );

    checkSession();

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, [setUser, setStoreLoading]);

  return (
    <AuthContext.Provider value={{ loading: localLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
