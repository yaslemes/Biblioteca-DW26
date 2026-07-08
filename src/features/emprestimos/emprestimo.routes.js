import controller from "./index.js";

export default async function emprestimoRoutes(app) {

  app.post(
    "/",
    {
      schema: {
        tags: ["Empréstimos"],
        summary: "Cadastrar empréstimo",

        body: {
          type: "object",
          required: [
            "usuario_id",
            "livro_id",
            "data_prevista_devolucao"
          ],

          properties: {
            usuario_id: {
              type: "integer",
            },

            livro_id: {
              type: "integer",
            },

            data_prevista_devolucao: {
              type: "string",
            },

            data_devolucao: {
              type: ["string", "null"],
            },
          },
        },

        response: {
          201: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },

              usuario_id: {
                type: "integer",
              },

              livro_id: {
                type: "integer",
              },

              data_emprestimo: {
                type: "string",
              },

              data_prevista_devolucao: {
                type: "string",
              },

              data_devolucao: {
                type: ["string", "null"],
              },

              status: {
                type: "string",
              },
            },
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
        tags: ["Empréstimos"],
        summary: "Listar empréstimos",
      },
    },
    controller.findAll.bind(controller)
  );


  app.get(
    "/:id/detalhes",
    {
      schema: {
        tags: ["Empréstimos"],
        summary: "Consultar empréstimo com JOIN",

        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
          },
        },
      },
    },
    controller.findByIdWithDetails.bind(controller)
  );


  app.get(
    "/:id",
    {
      schema: {
        tags: ["Empréstimos"],
        summary: "Buscar empréstimo por ID",

        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
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
        tags: ["Empréstimos"],
        summary: "Atualizar empréstimo",

        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
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
        tags: ["Empréstimos"],
        summary: "Excluir empréstimo",

        params: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
          },
        },
      },
    },
    controller.delete.bind(controller)
  );

}