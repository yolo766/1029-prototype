import { Express } from "express";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { Server } from "http";
import path from "path";

export const log = (str: string) => {
  console.log(`${new Date().toLocaleTimeString("en-US", { hour12: false })} [express] ${str}`);
};

export async function setupVite(app: Express, server: Server): Promise<ViteDevServer> {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  return vite;
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");
  app.use(express.static(distPath));
  
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
