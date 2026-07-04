import controller from "./index.js";

export default async function livroRoutes(app) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Livros"],
        summary: "Cadastrar livro",

        body: {
          type: "object",
          required: [
            "titulo",
            "isbn",
            "categoria_id",
            "quantidade_total",
            "quantidade_disponivel",
          ],
          properties: {
            titulo: { type: "string" },
            isbn: { type: "string" },
            editora: { type: "string" },
            ano_publicacao: { type: "integer" },
            categoria_id: { type: "integer" },
            quantidade_total: { type: "integer" },
            quantidade_disponivel: { type: "integer" },
          },
        },

        response: {
          201: {
            type: "object",
          },
        },
      },
    },
    controller.create.bind(controller)
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Livros"],
        summary: "Listar livros",
      },
    },
    controller.findAll.bind(controller)
  );

  app.get(
    "/detalhes",
    {
      schema: {
        tags: ["Livros"],
        summary: "Listar livros com autores",
      },
    },
    controller.findAllWithDetails.bind(controller)
  );

  app.post(
    "/:id/autores",
    {
      schema: {
        tags: ["Livros"],
        summary: "Vincular autor ao livro",

        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },

        body: {
          type: "object",
          required: ["autor_id"],
          properties: {
            autor_id: { type: "integer" },
          },
        },
      },
    },
    controller.addAutor.bind(controller)
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Livros"],
        summary: "Buscar livro por ID",

        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
    controller.findById.bind(controller)
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["Livros"],
        summary: "Atualizar livro",

        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },

        body: {
          type: "object",
        },
      },
    },
    controller.update.bind(controller)
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Livros"],
        summary: "Excluir livro",

        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
    controller.delete.bind(controller)
  );
}