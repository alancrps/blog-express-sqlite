import express from "express";
import { crearUsuario } from "./usuario.service";


const usuarioRoutes = express.Router();

usuarioRoutes.post('/', crearUsuario);

export default usuarioRoutes;