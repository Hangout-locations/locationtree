import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import type React from "react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { SiApple, SiGoogle } from "react-icons/si";
import type { AuthScreen } from "../AuthModal";
import { axiosClient } from "../../interceptors/http";
import toast from "react-hot-toast";

interface AuthModalProps {
  onClose: () => void;
  setScreen: Dispatch<SetStateAction<AuthScreen>>;
}

export const SignUp: React.FC<AuthModalProps> = ({ setScreen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    axiosClient
      .post("/auth/login")
      .then((res) => {
        toast.success("You are in, enjoy your session");
        onClose();
      })
      .catch((err) => {
        toast.success(
          err?.response?.data?.message || "Error logging in, try again",
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <main>
      <form onSubmit={handleSignUpSubmit} className="w-full space-y-6">
        <div className="space-y-1.5 text-left">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Create an account
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Kindly fill in all fields below correctly
          </p>
        </div>

        {/* Input fields container */}
        <div className="space-y-3">
          {/* First Name field */}
          <div className="flex items-center gap-3 border border-border/80 bg-[#f4f3ec] dark:bg-muted/30 rounded-2xl px-4 py-3.5 transition-colors focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10">
            <User className="h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Full Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-sm font-bold text-foreground outline-none border-none p-0 focus:ring-0"
            />
          </div>

          {/* Email field */}
          <div className="flex items-center gap-3 border border-border/80 bg-[#f4f3ec] dark:bg-muted/30 rounded-2xl px-4 py-3.5 transition-colors focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent text-sm font-bold text-foreground outline-none border-none p-0 focus:ring-0"
            />
          </div>

          {/* Password field */}
          <div className="flex items-center gap-3 border border-border/80 bg-[#f4f3ec] dark:bg-muted/30 rounded-2xl px-4 py-3.5 transition-colors focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent text-sm font-bold text-foreground outline-none border-none p-0 focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Action Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="disabled:opacity-55 disabled:cursor-not-allowed w-full rounded-full bg-purple-950 hover:bg-purple-900 dark:bg-purple-800 dark:hover:bg-purple-750 text-white font-bold py-3.5 px-6 shadow-md transition-[transform,background-color] duration-160 ease-out active:scale-97 cursor-pointer text-base text-center"
        >
          {loading ? "Signing up" : "Sign Up"}
        </button>

        {/* Continuing parameters divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-x-0 h-px bg-border/60" />
          <span className="relative px-3 text-xs font-semibold text-muted-foreground bg-card">
            or signup with
          </span>
        </div>

        {/* Social Authentication buttons */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-purple-950/20 dark:border-purple-300/20 hover:bg-muted/40 transition-colors py-3 font-bold text-sm text-foreground cursor-pointer"
          >
            <SiApple className="h-5 w-5 text-foreground" />
            <span>Apple</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-purple-950/20 dark:border-purple-300/20 hover:bg-muted/40 transition-colors py-3 font-bold text-sm text-foreground cursor-pointer"
          >
            <SiGoogle className="h-4.5 w-4.5 text-red-500" />
            <span>Google</span>
          </button>
        </div>

        {/* Swap Trigger footer */}
        <div className="text-center text-xs font-semibold text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setScreen("login")}
            className="text-purple-700 dark:text-purple-300 font-bold hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
    </main>
  );
};
