import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Loader2, Mail, Github } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./SignIn.css";

type OtpStep = "email" | "verify";

export function SignIn() {
  const {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    sendEmailOTP,
    verifyEmailOTP,
  } = useAuth();

  const [otpStep, setOtpStep] = useState<OtpStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;

  async function handleGoogleSignIn() {
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  }

  async function handleGithubSignIn() {
    setError(null);
    try {
      await signInWithGithub();
    } catch {
      setError("GitHub sign-in failed. Please try again.");
    }
  }

  async function handleSendOTP(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setOtpLoading(true);
    try {
      const code = await sendEmailOTP(email.trim());
      setDevOtp(code);
      setOtpStep("verify");
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleVerifyOTP(e: FormEvent) {
    e.preventDefault();
    if (!otp.trim()) return;
    setError(null);
    setOtpLoading(true);
    try {
      await verifyEmailOTP(email.trim(), otp.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setOtpLoading(false);
    }
  }

  function handleBackToEmail() {
    setOtpStep("email");
    setOtp("");
    setDevOtp(null);
    setError(null);
  }

  return (
    <div className="signin">
      <div className="signin__card">
        <div className="signin__logo">⚡</div>
        <h1 className="signin__title">fullstack-dojo</h1>
        <p className="signin__subtitle">Sign in to track your interview prep</p>

        {error && (
          <p className="signin__error" role="alert">
            {error}
          </p>
        )}

        {/* OAuth buttons */}
        <div className="signin__oauth">
          <button
            className="signin__oauth-btn signin__oauth-btn--google"
            onClick={handleGoogleSignIn}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            {loading ? (
              <Loader2 size={16} className="signin__spinner" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          <button
            className="signin__oauth-btn signin__oauth-btn--github"
            onClick={handleGithubSignIn}
            disabled={loading}
            aria-label="Sign in with GitHub"
          >
            {loading ? (
              <Loader2 size={16} className="signin__spinner" />
            ) : (
              <Github size={16} />
            )}
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="signin__divider">
          <span className="signin__divider-line" />
          <span className="signin__divider-text">or continue with email</span>
          <span className="signin__divider-line" />
        </div>

        {/* Email OTP */}
        {otpStep === "email" ? (
          <form className="signin__form" onSubmit={handleSendOTP}>
            <label className="signin__label" htmlFor="signin-email">
              Email address
            </label>
            <input
              id="signin-email"
              className="signin__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <button
              className="signin__submit"
              type="submit"
              disabled={otpLoading || !email.trim()}
            >
              {otpLoading ? (
                <Loader2 size={15} className="signin__spinner" />
              ) : (
                <Mail size={15} />
              )}
              Send OTP
            </button>
          </form>
        ) : (
          <form className="signin__form" onSubmit={handleVerifyOTP}>
            <div className="signin__otp-header">
              <p className="signin__otp-sent">
                Code sent to <strong>{email}</strong>
              </p>
              <button
                type="button"
                className="signin__otp-back"
                onClick={handleBackToEmail}
              >
                Change email
              </button>
            </div>
            <label className="signin__label" htmlFor="signin-otp">
              6-digit code
            </label>
            <input
              id="signin-otp"
              className="signin__input signin__input--otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
              autoFocus
              autoComplete="one-time-code"
            />
            {devOtp && (
              <p className="signin__dev-hint">
                <span className="signin__dev-label">DEV</span> OTP:{" "}
                <strong>{devOtp}</strong>
              </p>
            )}
            <button
              className="signin__submit"
              type="submit"
              disabled={otpLoading || otp.length !== 6}
            >
              {otpLoading ? (
                <Loader2 size={15} className="signin__spinner" />
              ) : null}
              Verify & Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
