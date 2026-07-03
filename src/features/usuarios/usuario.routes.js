import usuarioController from "./index.js";

export default async function usuarioRoutes(app) {
  app.get("/", usuarioController.findAll.bind(usuarioController));
  app.get("/:id", usuarioController.findById.bind(usuarioController));
  app.post("/", usuarioController.create.bind(usuarioController));
  app.put("/:id", usuarioController.update.bind(usuarioController));
  app.delete("/:id", usuarioController.delete.bind(usuarioController));
}