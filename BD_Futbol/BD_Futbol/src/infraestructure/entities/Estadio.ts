import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./Ciudad";
import { Partido } from "./Partido";

@Entity()
export class Estadio {
    @PrimaryGeneratedColumn()
    id_estadio!: number;

    @Column({ type: "varchar", length: 100 })
    nombre_estadio!: string;

    @Column({ type: "int" })
    capacidad!: number;

    @ManyToOne(() => Ciudad, (ciudad) => ciudad.estadios)
    @JoinColumn({ name: "id_ciudad" })
    ciudad!: Ciudad;

    @Column({})
    id_ciudad!: number;

    @OneToMany(() => Partido, (partido) => partido.estadio)
    partidos!: Partido[];

}