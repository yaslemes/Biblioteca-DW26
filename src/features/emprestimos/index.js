import EmprestimoRepository from "./EmprestimoRepository.js";
import EmprestimoService from "./EmprestimoService.js";
import EmprestimoController from "./EmprestimoController.js";

import LivroRepository from "../livros/LivroRepository.js";

const emprestimoRepository = new EmprestimoRepository();
const livroRepository = new LivroRepository();

const emprestimoService = new EmprestimoService(
  emprestimoRepository,
  livroRepository
);

const emprestimoController = new EmprestimoController(
  emprestimoService
);

export default emprestimoController;