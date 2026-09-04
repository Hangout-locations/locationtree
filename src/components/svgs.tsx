interface ISvgIconProps {
  className?: string | undefined;
  size?: number;
}

export function AllIcon({ size = 24, className }: ISvgIconProps) {
  return (
    <svg
      className={(className as string) || undefined}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="7" height="7" rx="2" fill="#6366F1" />
      <rect x="14" y="3" width="7" height="7" rx="2" fill="#22C55E" />
      <rect x="3" y="14" width="7" height="7" rx="2" fill="#F59E0B" />
      <rect x="14" y="14" width="7" height="7" rx="2" fill="#EC4899" />
    </svg>
  );
}

export function PartiesIcon({ size = 24, className }: ISvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={(className as string) || undefined}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="8" r="3.5" fill="#6366F1" />
      <circle cx="17" cy="9" r="3" fill="#EC4899" />
      <path
        d="M3 20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20"
        fill="#22C55E"
      />
      <path
        d="M14 15C14.8434 14.3541 15.8958 14 17 14C19.7614 14 22 16.2386 22 19V20H15"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function HomeIcon({ size = 24, className }: ISvgIconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={(className as string) || undefined}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        fill="#4F46E5"
      />
      <path
        d="M9 21V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V21"
        fill="#FACC15"
      />
      <path
        d="M12 3L3 10.5"
        stroke="#22C55E"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M12 3L21 10.5"
        stroke="#22C55E"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
