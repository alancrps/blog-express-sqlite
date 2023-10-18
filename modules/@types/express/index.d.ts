import Request from 'express';
import { IUsuario } from '../../usuario/usuario.interface';
declare global {
    namespace Express {
        export interface Request{
            usuario: IUsuario
        }
    }
}