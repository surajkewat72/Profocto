import { ConvexAdapter } from "./convex-adapter";
import { ConvexHttpClient } from "convex/browser";

// Get Convex URL with proper error handling
const getConvexUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  if (!url) {
    console.warn("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
    // Return a placeholder URL to prevent app crash
    return "https://placeholder.convex.cloud";
  }
  
  return url;
};

const convex = new ConvexHttpClient(getConvexUrl());

export const convexAdapter = ConvexAdapter(convex);
export { convex };