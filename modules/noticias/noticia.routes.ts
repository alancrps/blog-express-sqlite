import express from 'express';
import {  actualizarNoticia, borrarNoticia, crearNoticia, listarNoticia, obtenerNoticiaId } from './noticia.service';

const noticiasRoutes = express.Router();

//endpoint crear noticia
noticiasRoutes.post('/', crearNoticia);

// endpoint consultar todas las noticais

noticiasRoutes.get('/', listarNoticia);

//endpoint obtener noticia por id

noticiasRoutes.get('/:id', obtenerNoticiaId);

//endpoint borrar noticia

noticiasRoutes.delete('/:id', borrarNoticia);

//end point update noticia

noticiasRoutes.patch('/:id', actualizarNoticia)
export default noticiasRoutes;