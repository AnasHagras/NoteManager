import { User, Session, AuthError } from "@supabase/supabase-js";
interface SignUpResponse {
  user: User | null;
  error: AuthError | null;
}

interface SignInResponse {
  user: User | null;
  error: AuthError | null;
}

interface LogoutResponse {
  error: AuthError | null;
}

interface SessionResponse {
  session: Session | null;
  error: AuthError | null;
}

export type { SignUpResponse, SignInResponse, SessionResponse, LogoutResponse };
