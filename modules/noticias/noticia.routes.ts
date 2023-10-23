import express from 'express';
import {  actualizarNoticia, borrarNoticia, buscarNoticiaByTitulo, crearNoticia, listarNoticia, obtenerNoticia, obtenerNoticiasDeUsuario } from './noticia.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

const noticiasRoutes = express.Router();

//endpoint crear noticia
noticiasRoutes.post('/', verifyTokenMiddleware, crearNoticia);

// endpoint consultar todas las noticais

// noticiasRoutes.get('/', listarNoticia);

//endpoint obtener noticia por id

noticiasRoutes.get('/:id', obtenerNoticia);

//endpoint borrar noticia

noticiasRoutes.delete('/:id', verifyTokenMiddleware, borrarNoticia);

//end point update noticia

noticiasRoutes.patch('/:id', verifyTokenMiddleware, actualizarNoticia)

//end point para obtener todas las noticias del usuario logeado
noticiasRoutes.get('/my/all', verifyTokenMiddleware, obtenerNoticiasDeUsuario);

// end point para buscar una noticia por titulo
// noticiasRoutes.get('/titulo/buscar', buscarNoticiaByTitulo)


export default noticiasRoutes;