import AppError from "../../errors/AppError.js";

export default class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll() {
    return await this.usuarioRepository.findAll();
  }

  async findById(id) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return usuario;
  }

  async create(data) {
    const emailExiste = await this.usuarioRepository.findByEmail(data.email);

    if (emailExiste) {
      throw new AppError("Já existe um usuário com este e-mail.", 400);
    }

    const cpfExiste = await this.usuarioRepository.findByCpf(data.cpf);

    if (cpfExiste) {
      throw new AppError("Já existe um usuário com este CPF.", 400);
    }

    return await this.usuarioRepository.create(data);
  }

  async update(id, data) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (data.email !== usuario.email) {
      const emailExiste = await this.usuarioRepository.findByEmail(data.email);

      if (emailExiste) {
        throw new AppError("Já existe um usuário com este e-mail.", 400);
      }
    }

    if (data.cpf !== usuario.cpf) {
      const cpfExiste = await this.usuarioRepository.findByCpf(data.cpf);

      if (cpfExiste) {
        throw new AppError("Já existe um usuário com este CPF.", 400);
      }
    }

    return await this.usuarioRepository.update(id, data);
  }

  async delete(id) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    await this.usuarioRepository.delete(id);
  }
}