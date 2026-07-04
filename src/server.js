import Fastify from "fastify";
import env from "./config/env.js";
import AppErrorHandler from "./errors/AppErrorHandler.js";

import swagger from "./docs/swagger.js";
import routes from "./routes/index.js";

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
    // Swagger
    await app.register(swagger);

    // Rotas
    await app.register(routes);

    await app.listen({
      port: env.port || 3333,
    });

    console.log(
      `🚀 Servidor rodando em http://localhost:${env.port || 3333}`
    );
    console.log(
      `📖 Swagger disponível em http://localhost:${env.port || 3333}/docs`
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();