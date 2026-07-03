import AutorRepository from "./AutorRepository.js";
import AutorService from "./AutorService.js";
import AutorController from "./AutorController.js";

const autorRepository = new AutorRepository();
const autorService = new AutorService(autorRepository);
const autorController = new AutorController(autorService);

export default autorController;