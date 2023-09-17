
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comentario } from "../comentarios/comentario.entity";

@Entity()
export class Noticia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;
    
    @Column()
    contenido: string
    
    @CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    @OneToMany(() => Comentario, (c) => c.noticia)
    comentarios: Comentario[]
}