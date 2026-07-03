export default class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async findAll(request, reply) {
    const usuarios = await this.usuarioService.findAll();

    return reply.status(200).send(usuarios);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const usuario = await this.usuarioService.findById(id);

    return reply.status(200).send(usuario);
  }

  async create(request, reply) {
    const usuario = await this.usuarioService.create(request.body);

    return reply.status(201).send(usuario);
  }

  async update(request, reply) {
    const { id } = request.params;

    const usuario = await this.usuarioService.update(id, request.body);

    return reply.status(200).send(usuario);
  }

  async delete(request, reply) {
    const { id } = request.params;

    await this.usuarioService.delete(id);

    return reply.status(204).send();
  }
}