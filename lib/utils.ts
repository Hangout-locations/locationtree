import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateShort = (date: Date | undefined) => {
  if (!date) return "";

  const newDate = new Date(date as Date);

  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
