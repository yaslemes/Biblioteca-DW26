import AppError from "../../errors/AppError.js";

class LivroService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findAllWithDetails() {
    return await this.repository.findAllWithDetails();
  }

  async findById(id) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    return livro;
  }

  async update(id, data) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    return await this.repository.update(id, data);
  }

  async delete(id) {
    const livro = await this.repository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    await this.repository.delete(id);

    return {
      message: "Livro removido com sucesso."
    };
  }

  async addAutor(livroId, autorId) {
    const livro = await this.repository.findById(livroId);

    if (!livro) {
      throw new AppError("Livro não encontrado.", 404);
    }

    return await this.repository.addAutor(livroId, autorId);
  }
}

export default LivroService;