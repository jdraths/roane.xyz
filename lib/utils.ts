import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateAtWord = ({str, maxLength = 50, ending = "..."}: {str: string, maxLength?: number, ending?: string}) => {
  if (str.length <= maxLength) return str;
  const limit = maxLength - ending.length;

  // Look for the last space or comma before the maxLength
  const boundary = Math.max(
    str.slice(0, limit + 1).lastIndexOf(' '),
    str.slice(0, limit + 1).lastIndexOf(',')
  );
// Check if the boundary is a space and preceded by a comma
  if (
    boundary > 0 &&
    str[boundary] === ' ' &&
    str[boundary - 1] === ','
  ) {
    // Truncate at the comma (before the space)
    return str.slice(0, boundary - 1) + ending;
  }

  // Otherwise, truncate at the found boundary or hard cut
  const cut = boundary > 0 ? boundary : limit;
  return str.slice(0, cut) + ending;
}
