import Fastify from "fastify";
import env from "./config/env.js";
import AppErrorHandler from "./errors/AppErrorHandler.js";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "API Biblioteca rodando",
  };
});

app.setErrorHandler(AppErrorHandler);

const start = async () => {
  try {
    await app.listen({
      port: env.port || 3333,
    });

    console.log(`🚀 Servidor rodando em http://localhost:${env.port || 3333}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();