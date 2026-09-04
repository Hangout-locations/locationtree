import type React from "react";

const Skeleton = ({ className = "" }: { className?: string }) => {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
};

const FieldSkeleton = ({ textarea = false }: { textarea?: boolean }) => (
  <div className="block space-y-1.5">
    <Skeleton className="h-3 w-24" />

    {textarea ? (
      <Skeleton className="h-24 w-full rounded-2xl" />
    ) : (
      <Skeleton className="h-12 w-full rounded-2xl" />
    )}
  </div>
);

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 md:px-8 py-8">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-10 w-10 rounded-2xl" />
        <Skeleton className="h-5 w-20" />
      </div>

      {/* Profile card */}
      <div className="rounded-[28px] border border-border bg-card p-6 md:p-8 space-y-6">
        {/* Profile information */}
        <div className="flex items-center gap-5">
          <Skeleton className="h-16 w-16 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>

        {/* Form */}
        <div className="border-t border-border/50 pt-6 space-y-4">
          {/* First name */}
          <FieldSkeleton />

          {/* Last name */}
          <FieldSkeleton />

          {/* Email */}
          <FieldSkeleton />

          {/* Country */}
          <FieldSkeleton />

          {/* State */}
          <FieldSkeleton />

          {/* City */}
          <FieldSkeleton />

          {/* Address */}
          <FieldSkeleton />

          {/* Phone */}
          <FieldSkeleton />

          {/* Bio */}
          <FieldSkeleton textarea />

          {/* Save button */}
          <div className="flex justify-end pt-2">
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
