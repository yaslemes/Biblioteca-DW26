import EmprestimoController from "./EmprestimoController.js";

export default async function emprestimoRoutes(app) {
  app.post("/", EmprestimoController.create);

  app.get("/", EmprestimoController.findAll);

  app.get("/:id", EmprestimoController.findById);

  app.put("/:id", EmprestimoController.update);

  app.delete("/:id", EmprestimoController.delete);
}