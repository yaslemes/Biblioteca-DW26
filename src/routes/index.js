import livroRoutes from "../features/livros/livro.routes.js";
import emprestimoRoutes from "../features/emprestimos/emprestimo.routes.js";

export default async function routes(app) {
  app.register(livroRoutes);
  app.register(emprestimoRoutes);
}