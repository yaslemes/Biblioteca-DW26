import AppError from "../../errors/AppError.js";

export default class AutorService {
  constructor(autorRepository) {
    this.autorRepository = autorRepository;
  }

  async findAll() {
    return await this.autorRepository.findAll();
  }

  async findById(id) {
    const autor = await this.autorRepository.findById(id);

    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    return autor;
  }

  async create(data) {
    return await this.autorRepository.create(data);
  }

  async update(id, data) {
    const autor = await this.autorRepository.findById(id);

    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    return await this.autorRepository.update(id, data);
  }

  async delete(id) {
    const autor = await this.autorRepository.findById(id);

    if (!autor) {
      throw new AppError("Autor não encontrado.", 404);
    }

    await this.autorRepository.delete(id);
  }
}