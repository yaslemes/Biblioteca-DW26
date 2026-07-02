import LivroController from "./LivroController.js";

export default async function livroRoutes(app) {
  app.post("/", LivroController.create);

  app.get("/", LivroController.findAll);

  app.get("/detalhes", LivroController.findAllWithDetails);

  app.get("/:id", LivroController.findById);

  app.put("/:id", LivroController.update);

  app.delete("/:id", LivroController.delete);
}