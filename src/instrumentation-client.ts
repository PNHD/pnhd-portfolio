import { initializeAnalytics } from "@/lib/analytics";

try {
  initializeAnalytics();
} catch (error) {
  if (process.env.NODE_ENV === "development") {
    console.warn("Analytics initialization failed.", error);
  }
}
