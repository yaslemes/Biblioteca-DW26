import LivroRepository from "./LivroRepository.js";
import AppError from "../../errors/AppError.js";

class LivroService {
  async create(data) {
    return await LivroRepository.create(data);
  }

  async findAll() {
    return await LivroRepository.findAll();
  }

  async findAllWithDetails() {
    return await LivroRepository.findAllWithDetails();
  }

  async findById(id) {
    const livro = await LivroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    return livro;
  }

  async update(id, data) {
    const livro = await LivroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    return await LivroRepository.update(id, data);
  }

  async delete(id) {
    const livro = await LivroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    await LivroRepository.delete(id);

    return {
      message: "Livro removido com sucesso."
    };
  }
}

export default new LivroService();