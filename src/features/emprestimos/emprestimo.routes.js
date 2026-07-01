import EmprestimoController from "./EmprestimoController.js";

export default async function emprestimoRoutes(app) {

  app.post("/emprestimos", EmprestimoController.create);

  app.get("/emprestimos", EmprestimoController.findAll);

  app.get("/emprestimos/:id", EmprestimoController.findById);

  app.patch("/emprestimos/:id", EmprestimoController.update);

  app.delete("/emprestimos/:id", EmprestimoController.delete);

}