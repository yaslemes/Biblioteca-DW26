import AppError from "../../errors/AppError.js";

class EmprestimoService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id) {
    const emprestimo = await this.repository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    return emprestimo;
  }

  async findByIdWithDetails(id) {
    const emprestimo = await this.repository.findByIdWithDetails(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    return emprestimo;
  }

  async update(id, data) {
    const emprestimo = await this.repository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    return await this.repository.update(id, data);
  }

  async delete(id) {
    const emprestimo = await this.repository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    await this.repository.delete(id);

    return {
      message: "Empréstimo removido com sucesso.",
    };
  }
}

export default EmprestimoService;