import EmprestimoRepository from "./EmprestimoRepository.js";
import EmprestimoService from "./EmprestimoService.js";
import EmprestimoController from "./EmprestimoController.js";

const emprestimoRepository = new EmprestimoRepository();

const emprestimoService = new EmprestimoService(
  emprestimoRepository
);

const emprestimoController = new EmprestimoController(
  emprestimoService
);

export default emprestimoController;