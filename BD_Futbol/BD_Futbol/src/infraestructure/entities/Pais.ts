import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./Ciudad";
import { Equipo } from "./Equipo";

@Entity()
export class Pais {
    @PrimaryGeneratedColumn()
    id_pais!: number;

    @Column({ type: "varchar", length: 100 })
    nombre_pais!: string;

    @OneToMany(() => Ciudad, (ciudad) => ciudad.pais)
    ciudades!: Ciudad[];

    @OneToMany(() => Equipo, (equipo) => equipo.pais)
    equipos!: Equipo[];
}
