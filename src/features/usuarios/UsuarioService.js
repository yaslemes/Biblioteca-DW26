import AppError from "../../errors/AppError.js";

export default class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async findAll() {
    // 1. Lista todos os usuários
    return await this.usuarioRepository.findAll();
  }

  async findById(id) {
    // 1. Busca usuário por ID
    const usuario = await this.usuarioRepository.findById(id);

    // 2. Verifica se o usuário existe
    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return usuario;
  }

  async create(data) {
    // 1. Regra de negócio:
    // Não é permitido cadastrar dois usuários com o mesmo e-mail.
    const emailExiste = await this.usuarioRepository.findByEmail(data.email);

    if (emailExiste) {
      throw new AppError("Já existe um usuário com este e-mail.", 400);
    }

    // 2. Regra de negócio:
    // Não é permitido cadastrar dois usuários com o mesmo CPF.
    const cpfExiste = await this.usuarioRepository.findByCpf(data.cpf);

    if (cpfExiste) {
      throw new AppError("Já existe um usuário com este CPF.", 400);
    }

    // 3. Cria um novo usuário
    return await this.usuarioRepository.create(data);
  }

  async update(id, data) {
    // 1. Busca usuário por ID
    const usuario = await this.usuarioRepository.findById(id);

    // 2. Verifica se o usuário existe
    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    // 3. Regra de negócio:
    // Ao atualizar, não é permitido usar um e-mail já cadastrado por outro usuário.
    if (data.email && data.email !== usuario.email) {
      const emailExiste = await this.usuarioRepository.findByEmail(data.email);

      if (emailExiste) {
        throw new AppError("Já existe um usuário com este e-mail.", 400);
      }
    }

    // 4. Regra de negócio:
    // Ao atualizar, não é permitido usar um CPF já cadastrado por outro usuário.
    if (data.cpf && data.cpf !== usuario.cpf) {
      const cpfExiste = await this.usuarioRepository.findByCpf(data.cpf);

      if (cpfExiste) {
        throw new AppError("Já existe um usuário com este CPF.", 400);
      }
    }

    // 5. Atualiza os dados do usuário
    return await this.usuarioRepository.update(id, data);
  }

  async delete(id) {
    // 1. Busca usuário por ID
    const usuario = await this.usuarioRepository.findById(id);

    // 2. Verifica se o usuário existe
    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    // 3. Exclui o usuário
    await this.usuarioRepository.delete(id);
  }

  async findDetailsById(id) {
  // 1. Busca usuário por ID
  const usuario = await this.usuarioRepository.findById(id);

  // 2. Verifica se o usuário existe
  if (!usuario) {
    throw new AppError("Usuário não encontrado.", 404);
  }

  // 3. Consulta relacional com JOIN:
  // Retorna o usuário com endereço e empréstimos vinculados.
  return await this.usuarioRepository.findDetailsById(id);
}
}