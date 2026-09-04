import type React from "react";
import type { HostProfile } from "../types/listing";
import Profile from "./profile/Profile";

interface ProfilePageProps {
  profile: HostProfile;
  onUpdateProfile: (profile: HostProfile) => void;
}

export const HostProfilePage: React.FC<ProfilePageProps> = ({}) => {
  return (
    <div className="rounded-[28px] w-full border border-border bg-card p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-200 ease-out">
      <Profile />
    </div>
  );
};
