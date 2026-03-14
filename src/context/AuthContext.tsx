import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AuthProvider = "google" | "github" | "email";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: AuthProvider;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  sendEmailOTP: (email: string) => Promise<string>; // returns OTP (dev-only)
  verifyEmailOTP: (email: string, otp: string) => Promise<void>;
  signOut: () => void;
}

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

const AUTH_KEY = "fullstack-dojo-auth";

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function saveUser(user: AuthUser | null) {
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEY);
}

// ---------------------------------------------------------------------------
// Mock auth helpers
// NOTE: Replace these functions with real Firebase / Supabase SDK calls.
// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

// In-memory OTP store (dev only)
const otpStore = new Map<string, string>();

async function mockGoogleSignIn(): Promise<AuthUser> {
  await delay(900);
  return {
    id: "google-mock-001",
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    avatarUrl: undefined,
    provider: "google",
  };
}

async function mockGithubSignIn(): Promise<AuthUser> {
  await delay(900);
  return {
    id: "github-mock-001",
    name: "Alex Rivera",
    email: "alex@github.example.com",
    avatarUrl: undefined,
    provider: "github",
  };
}

function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      const u = await mockGoogleSignIn();
      saveUser(u);
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGithub = useCallback(async () => {
    setLoading(true);
    try {
      const u = await mockGithubSignIn();
      saveUser(u);
      setUser(u);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendEmailOTP = useCallback(async (email: string): Promise<string> => {
    await delay(600);
    const otp = generateOTP();
    otpStore.set(email.toLowerCase(), otp);
    // In production: call your auth API / Firebase sendSignInLinkToEmail here
    // console.log(`[DEV] OTP for ${email}: ${otp}`);
    return otp; // returned so the UI can show it in a dev hint
  }, []);

  const verifyEmailOTP = useCallback(
    async (email: string, otp: string): Promise<void> => {
      setLoading(true);
      try {
        await delay(600);
        const expected = otpStore.get(email.toLowerCase());
        if (!expected || expected !== otp.trim()) {
          throw new Error("Invalid or expired OTP. Please try again.");
        }
        otpStore.delete(email.toLowerCase());
        const u: AuthUser = {
          id: `email-${Date.now()}`,
          name: email.split("@")[0] ?? email,
          email,
          provider: "email",
        };
        saveUser(u);
        setUser(u);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    saveUser(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithGithub,
        sendEmailOTP,
        verifyEmailOTP,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
