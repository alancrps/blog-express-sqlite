import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcrypt";
import { Noticia } from "../noticias/noticia.entity";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    apellido:string;

    @Column()
    password: string;

    @CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    @Column({unique: true})
    email: string;

    @OneToMany(() => Noticia, (n) => n.usuario)
    noticias: Noticia[]
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeInsert()
    async emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}   