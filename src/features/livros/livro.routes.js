import controller from "./index.js";

export default async function livroRoutes(app) {
  app.post("/", controller.create.bind(controller));

  app.get("/", controller.findAll.bind(controller));

  app.get("/detalhes", controller.findAllWithDetails.bind(controller));

  app.get("/:id", controller.findById.bind(controller));

  app.put("/:id", controller.update.bind(controller));

  app.delete("/:id", controller.delete.bind(controller));
}