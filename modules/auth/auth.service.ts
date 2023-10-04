import { Request, Response } from "express";
import { dbcontext } from "../db/dbcontext";
import { Usuario } from "../usuario/usuario.entity";
import { Ilogin } from "./auth.interface";
import bcrypt from 'bcrypt';
import logger from "../logger/logger";
import { generarTokenJWT } from "./jwt.service";

export const login = async (req:Request, res: Response) => {
    try{
        //Se trae el usuario
        const usuarioRepository = dbcontext.getRepository(Usuario)
        let dataRequest: Ilogin = req.body
        //pasar a minuscula el email
        dataRequest.email = dataRequest.email.toLowerCase();

        const buscarUsuario = await usuarioRepository.findOneBy({
            email: dataRequest.email
        })

        if(!buscarUsuario){
            throw new Error('Usuario/contraseña incorrecto')
        }
        //se comparan las contraseñas
        const compararPass = await bcrypt.compare(
            dataRequest.password,
            buscarUsuario.password
        )
        
        if(!compararPass){
            throw new Error()
        }

        //Genero token
        const payload = {
            id_usuario: buscarUsuario.id,
            nombre: buscarUsuario.nombre,
            apellido: buscarUsuario.apellido,
            email: buscarUsuario.email
        }

        const token = generarTokenJWT(payload)

        res.json({
            token: token
        })
    }
    catch (error) {
        logger.error(error)
        res.status(401).json({
            msg: 'usuario/contraseña incorrecto'
        })
    }
}