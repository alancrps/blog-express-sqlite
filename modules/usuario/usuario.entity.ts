import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}