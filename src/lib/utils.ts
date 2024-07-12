import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addMinutesFromNow(minutes: number) {
  const date = new Date(Date.now() + minutes * 60 * 1000);
  return date;
}
