import type React from "react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export type AuthScreen =
  | "login"
  | "verify"
  | "new-password"
  | "success"
  | "signup";

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [screen, setScreen] = useState<AuthScreen>("login");

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setScreen("login");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-full sm:max-w-md h-full sm:h-auto rounded-none sm:rounded-[32px] border-t sm:border border-border bg-card p-5 sm:p-9 md:p-12 shadow-2xl animate-in fade-in sm:zoom-in-95 duration-200 top-0 left-0 sm:top-1/2 sm:left-1/2 translate-x-0 translate-y-0 sm:-translate-x-1/2 sm:-translate-y-1/2 overflow-y-auto">
        {screen !== "signup" && (
          <SignIn onClose={onClose} screen={screen} setScreen={setScreen} />
        )}
        {screen === "signup" && (
          <SignUp onClose={onClose} setScreen={setScreen} />
        )}
      </DialogContent>
    </Dialog>
  );
};
