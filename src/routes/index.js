import livroRoutes from "../features/livros/livro.routes.js";
import emprestimoRoutes from "../features/emprestimos/emprestimo.routes.js";

import usuarioRoutes from "../features/usuarios/usuario.routes.js";
import autorRoutes from "../features/autores/autor.routes.js";


export default async function routes(app) {
  
  // Rotas de usuários
  app.register(usuarioRoutes, {
    prefix: "/usuarios",
  });

  // Rotas de autores
  app.register(autorRoutes, {
    prefix: "/autores",
  });

  // Rotas de livros
  app.register(livroRoutes, {
    prefix: "/livros",
  });
  
  // Rotas de empréstimos
  app.register(emprestimoRoutes, {
    prefix: "/emprestimos",
  });
}