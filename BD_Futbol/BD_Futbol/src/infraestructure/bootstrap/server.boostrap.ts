import http from "http";
import express from "express";

export class ServerBootstrap {
  private app!: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const PORT = Number(process.env.PORT) || 4000; // 👈 CLAVE

      server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
        resolve(true);
      });

      server.on("error", (err) => {
        console.error("Error starting server:", err);
        reject(false);
      });
    });
  }
}