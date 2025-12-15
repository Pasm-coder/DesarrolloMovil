import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column({ type: "varchar", length: 250 })
    name_user!: string;

    @Column({ type: "varchar", length: 250, unique: true })
    email_user!: string;

    @Column({ type: "varchar", length: 250 })
    password_user!: string;
    
    @Column({ type: "int" })
    status_user!: number;
}