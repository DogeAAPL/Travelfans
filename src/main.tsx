import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./services/i18nConfig.ts";
import { initAnalytics } from "./services/AnalyticsService.ts";

initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
