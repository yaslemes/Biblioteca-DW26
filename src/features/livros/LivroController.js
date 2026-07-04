class LivroController {
  constructor(service) {
    this.service = service;
  }

  async create(request, reply) {
    const livro = await this.service.create(request.body);
    return reply.status(201).send(livro);
  }

  async findAll(request, reply) {
    const livros = await this.service.findAll();
    return reply.send(livros);
  }

  async findAllWithDetails(request, reply) {
    const livros = await this.service.findAllWithDetails();
    return reply.send(livros);
  }

  async findById(request, reply) {
    const { id } = request.params;
    const livro = await this.service.findById(id);
    return reply.send(livro);
  }

  async update(request, reply) {
    const { id } = request.params;
    const livro = await this.service.update(id, request.body);
    return reply.send(livro);
  }

  async delete(request, reply) {
    const { id } = request.params;
    const resultado = await this.service.delete(id);
    return reply.send(resultado);
  }
}

export default LivroController;