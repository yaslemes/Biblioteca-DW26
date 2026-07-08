import usuarioController from "./index.js";

export default async function usuarioRoutes(app) {
  app.get(
    "/",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Lista todos os usuários",
      },
    },
    usuarioController.findAll.bind(usuarioController),
  );

  app.get(
    "/:id/detalhes",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Busca usuário com endereço e empréstimos",
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
          required: ["id"],
        },
      },
    },
    usuarioController.findDetailsById.bind(usuarioController),
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Busca um usuário por ID",
      },
    },
    usuarioController.findById.bind(usuarioController),
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Cadastra um usuário",
      },
    },
    usuarioController.create.bind(usuarioController),
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Atualiza um usuário",
      },
    },
    usuarioController.update.bind(usuarioController),
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Usuários"],
        summary: "Remove um usuário",
      },
    },
    usuarioController.delete.bind(usuarioController),
  );
}