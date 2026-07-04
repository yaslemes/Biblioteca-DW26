import LivroRepository from "./LivroRepository.js";
import LivroService from "./LivroService.js";
import LivroController from "./LivroController.js";

const livroRepository = new LivroRepository();

const livroService = new LivroService(livroRepository);

const livroController = new LivroController(livroService);

export default livroController;