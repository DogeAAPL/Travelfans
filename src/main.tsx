import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import i18n from "./services/i18nConfig.ts";
import { AnalyticsService } from "./services/AnalyticsService.ts";

// Initialize i18n synchronously (already initialized in config)
// Initialize Analytics (with your Google Analytics ID)
AnalyticsService.init(import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX');
AnalyticsService.pageView(window.location.pathname, document.title);

createRoot(document.getElementById("root")!).render(<App />);
  