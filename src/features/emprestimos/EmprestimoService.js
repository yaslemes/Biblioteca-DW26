import AppError from "../../errors/AppError.js";

class EmprestimoService {
  constructor(emprestimoRepository, livroRepository) {
    this.emprestimoRepository = emprestimoRepository;
    this.livroRepository = livroRepository;
  }

  async create(data) {
    const { livro_id } = data;

    // 1. Verifica se o livro existe
    const livro = await this.livroRepository.findById(livro_id);

    if (!livro) {
      throw new AppError("Livro não encontrado", 404);
    }

    // 2. Verifica disponibilidade
    if (livro.quantidade_disponivel <= 0) {
      throw new AppError("Livro indisponível para empréstimo", 400);
    }

    // 3. Cria empréstimo
    const emprestimo = await this.emprestimoRepository.create({
      ...data,
      status: "EMPRESTADO",
      data_emprestimo: new Date(),
    });

    // 4. Baixa estoque
    await this.livroRepository.decreaseQuantidadeDisponivel(livro_id);

    return emprestimo;
  }

  async findAll() {
    return await this.emprestimoRepository.findAll();
  }

  async findById(id) {
    const emprestimo = await this.emprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado", 404);
    }

    return emprestimo;
  }

  async devolver(id) {
    // 1. Busca empréstimo
    const emprestimo = await this.emprestimoRepository.findById(id);

    if (!emprestimo) {
      throw new AppError("Empréstimo não encontrado", 404);
    }

    if (emprestimo.status === "DEVOLVIDO") {
      throw new AppError("Este livro já foi devolvido", 400);
    }

    // 2. Atualiza status
    const atualizado = await this.emprestimoRepository.update(id, {
      status: "DEVOLVIDO",
      data_devolucao: new Date(),
    });

    // 3. Sobe estoque do livro
    await this.livroRepository.increaseQuantidadeDisponivel(
      emprestimo.livro_id
    );

    return atualizado;
  }
}

export default EmprestimoService;