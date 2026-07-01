import Fastify from "fastify";
import dotenv from "dotenv";
import swagger from "./docs/swagger.js";
import routes from "./routes/index.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "API Biblioteca funcionando!",
  };
});

const start = async () => {
  try {
    await app.register(swagger);
    await app.register(routes);

    await app.listen({
      port: process.env.PORT || 3001,
      host: "0.0.0.0",
    });

    console.log("Servidor iniciado!");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();