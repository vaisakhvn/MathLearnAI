import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// a utility helper to merge tailwind classes ensuring no conflicts
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
