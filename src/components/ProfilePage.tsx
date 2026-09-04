import { User } from "lucide-react";
import type React from "react";
import Profile from "./profile/Profile";

// interface ProfilePageProps {
//   profile: HostProfile;
//   onUpdateProfile: (profile: HostProfile) => void;
// }

export const ProfilePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 md:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-purple-950/10 text-purple-950 dark:text-purple-300 flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>
        <h1 className="text-lg lg:text-xl font-semibold text-foreground tracking-tight">
          Profile
        </h1>
      </div>

      <div className="rounded-[28px] border border-border bg-card p-6 md:p-8 space-y-6">
        <Profile />
      </div>
    </div>
  );
};
