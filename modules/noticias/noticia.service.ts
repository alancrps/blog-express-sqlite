import { INoticia } from "./noticia.interface";
import { Request, Response } from "express";

import { dbcontext } from "../db/dbcontext";
import { Noticia } from "./noticia.entity";

export const crearNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const nuevaNoticia: INoticia = req.body;

		//se crea la noticia
		const noticia = await noticiaRepository.create(nuevaNoticia);
		// se guarda la noticia
		const result = await noticiaRepository.save(noticia);

		res.json({ msg: `Se creo la noticia con el id: ${result.id}` });
	} catch (error) {
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
		const noticia = await noticiaRepository.findBy({ id: `${noticiaId}` });
		if (!noticia) {
			throw new Error();
		}
		res.json({ data: noticia });
	} catch (error) {
		res.status(400).json({ msg: "No se pudo encontrar la noticia" });
	}
};

export const borrarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaId = req.params.id;
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const result = await noticiaRepository.delete(noticiaId);
		if (!result.affected) {
			throw new Error('no se afectaron columnas');
		}
		res.json({ msg: "noticia eliminada" });
	} catch (error) {
		res.status(404).json({ msg: "No se pudo encontrar la noticia" });
	}
};

export const actualizarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaId = req.params.id;
		const noticia: INoticia = req.body;
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const result = await noticiaRepository.update(noticiaId, noticia);
		if (!noticia) {
			throw new Error();
		}
		res.json({ msg: "noticia actualizada!" });
	} catch (error) {
		res.status(400).json({ msg: "No se pudo actualizar la noticia" });
	}
};
