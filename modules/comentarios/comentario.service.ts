import { Request, Response } from "express";
import { dbcontext } from "../db/dbcontext";
import { Comentario } from "./comentario.entity";
import { IComentario } from "./comentario.interface";

export  const crearComentario = async (req: Request, res: Response) => {
    try {
        // const comentarioRepository = await dbcontext.getRepository(Comentario)
        // const nuevoComentario: IComentario = req.body;

        // const comentario = await comentarioRepository.create(nuevoComentario);

        // const result = await comentarioRepository.save(comentario)

        const comentarioRepository = await dbcontext.getRepository(Comentario);
		const data: IComentario = req.body;

		const result = comentarioRepository.create({
            comentario: data.comentario,
            noticia: { id: data.idNoticia }
		});
        
        res.json({ msg: `Se creó el comentario`})
    } catch (error) {
        res.status(500).json({ msg: "No se pudo crear el comentario" });
    }
}

export  const borrarComentario = async(req: Request, res: Response) => {
    const comentarioId = req.params.id;
    const comentarioRepository = await dbcontext.getRepository(Comentario)
    const result = await comentarioRepository.delete(comentarioId)

    if (!result.affected) {
        throw new Error('no se afectaron columnas');
    }
    res.json({ msg: "comentario eliminado" });
}