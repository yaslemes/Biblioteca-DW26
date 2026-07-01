import LivroController from "./LivroController.js";

export default async function livroRoutes(app) {

  app.post("/livros", LivroController.create);

  app.get("/livros", LivroController.findAll);

  app.get("/livros/:id", LivroController.findById);

  app.patch("/livros/:id", LivroController.update);

  app.delete("/livros/:id", LivroController.delete);

  app.post("/livros/:id/autores", LivroController.vincularAutor);

}