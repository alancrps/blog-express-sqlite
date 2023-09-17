import { INoticia } from "./noticia.interface";
import { Request, Response } from "express";

import { dbcontext } from "../db/dbcontext";
import { Noticia } from "./noticia.entity";
import logger from "../logger/logger";

export const crearNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const nuevaNoticia: INoticia = req.body;

		//se crea la noticia sin guardar
		const noticia = await noticiaRepository.create(nuevaNoticia);
		// se guarda la noticia
		const result = await noticiaRepository.save(noticia);

		res.json({ msg: `Se creo la noticia con el id: ${result.id}` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: "No se pudo guardar la noticia" });
	}
};

export const listarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticias = await noticiaRepository.find();

		res.json({ data: noticias, cantidad: noticias.length });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "No se pudo obtener un listado de noticias" });
	}
};

export const obtenerNoticiaId = async (req: Request, res: Response) => {
	try {
		const noticiaId = req.params.id;
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		// const noticia = await noticiaRepository.findBy({ id: `${noticiaId}` });
		const noticia = await noticiaRepository.findOne({
			where: { id: noticiaId},
			relations: ['comentarios']
		})
		if (!noticia) {
			throw new Error();
		}
		res.json({ data: noticia });
	} catch (error) {
		logger.error(`No se puede obtener la noticia con id: ${req.params.id} desde la ip ${req.ip}`)
		res.status(404).json({ msg: "No se pudo encontrar la noticia" });
	}
};

export const borrarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaId = req.params.id;
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticiaBorrar = await noticiaRepository.delete(noticiaId);
		if (!noticiaBorrar.affected) {
			throw new Error("no se afectaron columnas");
		}
		logger.info(`La ip ${req.ip} borró la noticia ${req.params.id}`)
		res.json({ msg: "noticia eliminada" });
	} catch (error) {
		console.error(error)
		res.status(404).json({ msg: "No se pudo encontrar la noticia" });
	}
};

export const actualizarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaId = req.params.id;
		const noticia: INoticia = req.body;
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const result = await noticiaRepository.update(noticiaId, noticia);
		if (!result.affected) {
			throw new Error('No se pudo actualizar la noticia');
		}
		res.json({ msg: "noticia actualizada!" });
	} catch (error) {
		console.log(error)
		res.status(404).json({ msg: "No se pudo actualizar la noticia" });
	}
};
