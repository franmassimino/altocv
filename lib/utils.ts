import { clsx, type ClassValue } from "clsx"
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Type guard to check if a session exists and is valid
 */
export function isAuthenticated(
  session: Session | null
): session is Session {
  return !!session && !!session.user;
}
