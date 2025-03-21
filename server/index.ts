import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Necessário para ES Modules
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Corrige __dirname caso esteja usando ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const server = await registerRoutes(app);
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    await setupVite(app, server);
  } else {
    // Garante que os arquivos estáticos da build do Vite sejam servidos corretamente
    const distPath = path.resolve(__dirname, "..", "dist", "public");
    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = process.env.PORT || 5000;
  server.listen(port, "127.0.0.1", () => {
    log(`🚀 Server running at http://127.0.0.1:${port}`);
  });
})();