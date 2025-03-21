import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import '@/i18n';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Com nossa nova abordagem de gerenciamento de idioma não precisamos mais do LanguageProvider
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
