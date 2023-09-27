import { Request, Response } from "express";
import { dbcontext } from "../db/dbcontext";
import { Usuario } from "../usuario/usuario.entity";
import { Ilogin } from "./auth.interface";
import bcrypt from 'bcrypt';
import logger from "../logger/logger";

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
        res.json({msg:`El resultado del login fue: ${compararPass}`})
    }
    catch (error) {
        logger.error('Usuario/contraseña incorrecto')
        throw new Error('Usuario/contraseña incorrecto')
    }
}