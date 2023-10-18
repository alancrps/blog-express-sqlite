import { IUsuario } from "../usuario/usuario.interface";

export interface INoticia {
    id?: string,
    titulo: string,
    contenido: string,
    usuario?: IUsuario
}