import AppError from "../../errors/AppError.js";

class LivroService {
  constructor(livroRepository) {
    this.livroRepository = livroRepository;
  }

  async create(data) {
    return await this.livroRepository.create(data);
  }

  async findAll() {
    return await this.livroRepository.findAll();
  }

  async findById(id) {
    const livro = await this.livroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    return livro;
  }

  async update(id, data) {
    const livro = await this.livroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    return await this.livroRepository.update(id, data);
  }

  async delete(id) {
    const livro = await this.livroRepository.findById(id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    const hasEmprestimoAtivo =
      await this.livroRepository.hasEmprestimoAtivo(id);

    if (hasEmprestimoAtivo) {
      throw new AppError(
        "Não é possível excluir o livro pois existem empréstimos ativos",
        400
      );
    }

    await this.livroRepository.delete(id);

    return { message: "Livro deletado com sucesso" };
  }

  async decreaseQuantidadeDisponivel(id) {
    const livro = await this.livroRepository.decreaseQuantidadeDisponivel(id);

    if (!livro) {
      throw new AppError("Não há exemplares disponíveis para empréstimo", 400);
    }

    return livro;
  }

  async increaseQuantidadeDisponivel(id) {
    const livro = await this.livroRepository.increaseQuantidadeDisponivel(id);

    if (!livro) {
      throw new AppError(
        "Quantidade já está no limite máximo do estoque",
        400
      );
    }

    return livro;
  }
}

export default LivroService;