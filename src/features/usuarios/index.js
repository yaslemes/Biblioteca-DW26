import UsuarioRepository from "./UsuarioRepository.js";
import UsuarioService from "./UsuarioService.js";
import UsuarioController from "./UsuarioController.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

export default usuarioController;