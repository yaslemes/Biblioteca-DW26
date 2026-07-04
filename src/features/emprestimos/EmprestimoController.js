class EmprestimoController {
  constructor(service) {
    this.service = service;
  }

  async create(request, reply) {
    const emprestimo = await this.service.create(request.body);

    return reply.status(201).send(emprestimo);
  }

  async findAll(request, reply) {
    const emprestimos = await this.service.findAll();

    return reply.send(emprestimos);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const emprestimo = await this.service.findById(id);

    return reply.send(emprestimo);
  }

  async findByIdWithDetails(request, reply) {
    const { id } = request.params;

    const emprestimo = await this.service.findByIdWithDetails(id);

    return reply.send(emprestimo);
  }

  async update(request, reply) {
    const { id } = request.params;

    const emprestimo = await this.service.update(id, request.body);

    return reply.send(emprestimo);
  }

  async delete(request, reply) {
    const { id } = request.params;

    const resultado = await this.service.delete(id);

    return reply.send(resultado);
  }
}

export default EmprestimoController;