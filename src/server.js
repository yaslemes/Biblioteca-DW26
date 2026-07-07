import Fastify from "fastify";
import env from "./config/env.js";
import AppErrorHandler from "./errors/AppErrorHandler.js";

import pool from "./database/connection.js";
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

try {
  const result = await pool.query("SELECT NOW()");
  console.log("✅ Conectado ao PostgreSQL do Supabase!");
  console.log(result.rows[0]);
} catch (error) {
  console.error("❌ Erro ao conectar ao banco:");
  console.error(error);
}

const start = async () => {
  try {
    await app.register(swagger);
    await app.register(routes);

    await app.listen({
      port: env.port || 3333,
    });

    console.log(`🚀 Servidor rodando em http://localhost:${env.port || 3333}`);
    console.log(`📖 Swagger disponível em http://localhost:${env.port || 3333}/docs`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();