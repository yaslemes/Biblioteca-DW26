import EmprestimoService from "./EmprestimoService.js";

class EmprestimoController {
  async create(request, reply) {
    const emprestimo = await EmprestimoService.create(request.body);

    return reply.status(201).send(emprestimo);
  }

  async findAll(request, reply) {
    const emprestimos = await EmprestimoService.findAll();

    return reply.send(emprestimos);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const emprestimo = await EmprestimoService.findById(id);

    return reply.send(emprestimo);
  }

  async update(request, reply) {
    const { id } = request.params;

    const emprestimo = await EmprestimoService.update(id, request.body);

    return reply.send(emprestimo);
  }

  async delete(request, reply) {
    const { id } = request.params;

    const resultado = await EmprestimoService.delete(id);

    return reply.send(resultado);
  }
}

export default new EmprestimoController();