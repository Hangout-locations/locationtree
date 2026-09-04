import React, { memo, type ReactNode } from "react";
import useAppContext from "../hooks/useAppContext";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../ui/loading";

// Shared button class string or extracted component to prevent Tailwind bloat
const BUTTON_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "bg-purple-900 hover:bg-purple-850 active:bg-purple-950 " +
  "dark:bg-purple-700 dark:hover:bg-purple-650 dark:active:bg-purple-800 " +
  "text-white font-medium py-2.5 px-6 shadow-sm hover:shadow-md " +
  "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

interface INotSigedIn {
  children: ReactNode;
}

const NotSignedIn: React.FC<INotSigedIn> = ({ children }) => {
  const { data, isLoading } = useAuth();
  const { setIsAuthModal } = useAppContext();

  const handleOpenAuthModal = () => {
    setIsAuthModal(true);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[50vh] p-5 flex flex-col justify-center items-center">
        <div className="w-full mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!isLoading && data) {
    return children;
  }

  return (
    <main
      className="flex min-h-[50vh] w-full flex-col items-center justify-center p-6 text-center"
      aria-labelledby="not-signed-in-heading"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        {/* Optional Visual Anchor / Icon Container */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-900 dark:text-purple-300"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className="space-y-1">
          <h1
            id="not-signed-in-heading"
            className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
          >
            You are not logged in
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please log in or create an account to access this page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAuthModal}
          className={BUTTON_STYLES}
        >
          Log in
        </button>
      </div>
    </main>
  );
};

export default memo(NotSignedIn);
