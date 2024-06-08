import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WEAVETALK_PROCESS_ID =
  "Gwxf9Hr4Vuvhsu51CEZlF_qYc1qod0GVIT_kIByETZ0";
