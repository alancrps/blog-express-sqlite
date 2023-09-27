
import express, { Express, Request, Response }from 'express';
import bodyParser from 'body-parser';
import noticiasRoutes from './modules/noticias/noticia.routes';
import { dbcontext } from './modules/db/dbcontext';
import comentariosRoutes from './modules/comentarios/comentario.routes';
import { logMiddleware } from './modules/middleware/logMiddleware';
import { TypeORMError } from 'typeorm';
import logger from './modules/logger/logger';
import dotenv from 'dotenv'

import { authRoutes } from './modules/auth/auth.routes';
import { usuarioRoutes } from './modules/usuario/usuario.routes';

dotenv.config()
dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al conectar con la Base de datos: ${err.message}`)
	})

const app: Express = express();
const PORT = process.env.BLOG_PORT;

//Middleware a nivel global
app.use(logMiddleware)
app.use(bodyParser.json());


app.use('/noticia', noticiasRoutes)

app.use('/comentario', comentariosRoutes)

app.use('/usuario', usuarioRoutes)

app.use('/auth', authRoutes);

app.listen(1000, () => {
	logger.info(`⚡️ SERVER API IS RUNNING http://localhost:${PORT}`);
});