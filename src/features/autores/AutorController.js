export default class AutorController {
  constructor(autorService) {
    this.autorService = autorService;
  }

  async findAll(request, reply) {
    const autores = await this.autorService.findAll();
    return reply.status(200).send(autores);
  }

  async findById(request, reply) {
    const { id } = request.params;

    const autor = await this.autorService.findById(id);

    return reply.status(200).send(autor);
  }

  async create(request, reply) {
    const autor = await this.autorService.create(request.body);

    return reply.status(201).send(autor);
  }

  async update(request, reply) {
    const { id } = request.params;

    const autor = await this.autorService.update(id, request.body);

    return reply.status(200).send(autor);
  }

  async delete(request, reply) {
    const { id } = request.params;

    await this.autorService.delete(id);

    return reply.status(204).send();
  }
}