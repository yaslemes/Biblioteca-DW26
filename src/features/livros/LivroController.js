import LivroService from "./LivroService.js";

class LivroController {
  async create(request, reply) {
    const livro = await LivroService.create(request.body);
    return reply.status(201).send(livro);
  }

  async findAll(request, reply) {
    const livros = await LivroService.findAll();
    return reply.send(livros);
  }

  async findAllWithDetails(request, reply) {
    const livros = await LivroService.findAllWithDetails();
    return reply.send(livros);
  }

  async findById(request, reply) {
    const { id } = request.params;
    const livro = await LivroService.findById(id);
    return reply.send(livro);
  }

  async update(request, reply) {
    const { id } = request.params;
    const livro = await LivroService.update(id, request.body);
    return reply.send(livro);
  }

  async delete(request, reply) {
    const { id } = request.params;
    const resultado = await LivroService.delete(id);
    return reply.send(resultado);
  }
}

export default new LivroController();