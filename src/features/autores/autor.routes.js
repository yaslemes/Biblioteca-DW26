import autorController from "./index.js";

export default async function autorRoutes(app) {
  app.get("/", autorController.findAll.bind(autorController));
  app.get("/:id", autorController.findById.bind(autorController));
  app.post("/", autorController.create.bind(autorController));
  app.put("/:id", autorController.update.bind(autorController));
  app.delete("/:id", autorController.delete.bind(autorController));
}