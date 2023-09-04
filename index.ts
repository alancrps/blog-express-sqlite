
import express, { Express, Request, Response }from 'express';
import bodyParser from 'body-parser';
import noticiasRoutes from './modules/noticias/noticia.routes';
import { dbcontext } from './modules/db/dbcontext';


dbcontext
	.initialize()
	.then(() => {
		console.log('Base de datos conectada')
	})
	.catch((err) => {
		console.error("Error al conectar con la Base de datos", err)
	})


const app: Express = express();

app.use(bodyParser.json());

// app.use('/', (req: Request, res: Response)=>{
//     res.json({
//         message: "Funcionando..."
//     })
// })

app.use('/noticia', noticiasRoutes)

app.listen(3000, () => {
	console.log(`⚡️ SERVER API IS RUNNING http://localhost:3000`);
});