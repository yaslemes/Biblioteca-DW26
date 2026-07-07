import AppError from "../../errors/AppError.js";

export default class AutorService {
  constructor(autorRepository) {
    this.autorRepository = autorRepository;
  }

  async findAll() {
    // 1. Lista todos os autores
    return await this.autorRepository.findAll();
  }

  async findById(id) {
    // 1. Busca autor por ID
    const autor = await this.autorRepository.findById(id);

    // 2. Verifica se o autor existe
    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    return autor;
  }

  async create(data) {
    // 1. Cria um novo autor
    return await this.autorRepository.create(data);
  }

  async update(id, data) {
    // 1. Busca autor por ID
    const autor = await this.autorRepository.findById(id);

    // 2. Verifica se o autor existe
    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    // 3. Atualiza os dados do autor
    return await this.autorRepository.update(id, data);
  }

  async delete(id) {
    // 1. Busca autor por ID
    const autor = await this.autorRepository.findById(id);

    // 2. Verifica se o autor existe
    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    // 3. Regra de negócio:
    // Não é permitido excluir um autor que esteja vinculado a um ou mais livros.
    const autorPossuiLivros = await this.autorRepository.hasBooks(id);

    if (autorPossuiLivros) {
      throw new AppError(
        "Não é possível excluir este autor, pois ele está vinculado a um ou mais livros.",
        400
      );
    }

    // 4. Exclui o autor
    await this.autorRepository.delete(id);
  }
}