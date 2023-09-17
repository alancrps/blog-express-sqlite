import express from 'express';
import { borrarComentario, crearComentario } from './comentario.service';

const comentariosRoutes = express.Router();

comentariosRoutes.post('/', crearComentario);

comentariosRoutes.delete('/:id', borrarComentario);

export default comentariosRoutes;