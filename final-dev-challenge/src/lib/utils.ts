import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const QUIZZAR_PROCESS_ID = "XjaI24il_p6DT_ISYn8SWbyptNuCcp0XkxNkyt3hQz8";
export const QUIZZAR_PROCESS_ID = "XaIJVpaLc4GdMRv6lXziGr49pjBvIvcF1iCMa0RnEyk";
