
import express, { Express, Request, Response }from 'express';
import bodyParser from 'body-parser';
import noticiasRoutes from './modules/noticias/noticia.routes';
import { dbcontext } from './modules/db/dbcontext';
import comentariosRoutes from './modules/comentarios/comentario.routes';
import { logMiddleware } from './modules/middleware/logMiddleware';
import { TypeORMError } from 'typeorm';
import logger from './modules/logger/logger';


dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al conectar con la Base de datos: ${err.message}`)
	})

const app: Express = express();
//Middleware a nivel global
app.use(logMiddleware)
app.use(bodyParser.json());


app.use('/noticia', noticiasRoutes)

app.use('/comentario', comentariosRoutes)


app.listen(3000, () => {
	logger.info(`⚡️ SERVER API IS RUNNING http://localhost:3000`);
});