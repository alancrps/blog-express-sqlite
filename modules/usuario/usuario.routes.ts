import express from "express";
import { crearUsuario } from "./usuario.service";


export const usuarioRoutes = express.Router();

usuarioRoutes.post('/', crearUsuario);
