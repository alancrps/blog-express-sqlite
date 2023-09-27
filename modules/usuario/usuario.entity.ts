import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcrypt";

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeInsert()
    async emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}   