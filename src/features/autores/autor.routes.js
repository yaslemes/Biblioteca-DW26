import autorController from "./index.js";

export default async function autorRoutes(app) {
  app.get(
    "/",
    {
      schema: {
        tags: ["Autores"],
        summary: "Lista todos os autores",
      },
    },
    autorController.findAll.bind(autorController),
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Autores"],
        summary: "Busca um autor por ID",
      },
    },
    autorController.findById.bind(autorController),
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["Autores"],
        summary: "Cadastra um autor",
      },
    },
    autorController.create.bind(autorController),
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["Autores"],
        summary: "Atualiza um autor",
      },
    },
    autorController.update.bind(autorController),
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Autores"],
        summary: "Remove um autor",
      },
    },
    autorController.delete.bind(autorController),
  );
}