import EmprestimoRepository from "./EmprestimoRepository.js";
import AppError from "../../errors/AppError.js";

class EmprestimoService {
  async create(data) {
    return await EmprestimoRepository.create(data);
  }

  async findAll() {
    return await EmprestimoRepository.findAll();
  }

  async findById(id) {
    const emprestimo = await EmprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    return emprestimo;
  }

  async update(id, data) {
    const emprestimo = await EmprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    return await EmprestimoRepository.update(id, data);
  }

  async delete(id) {
    const emprestimo = await EmprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado.", 404);
    }

    await EmprestimoRepository.delete(id);

    return {
      message: "Empréstimo removido com sucesso."
    };
  }
}

export default new EmprestimoService();