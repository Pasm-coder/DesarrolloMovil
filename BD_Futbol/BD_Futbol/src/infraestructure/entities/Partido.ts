import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estadio } from "./Estadio";
import { Equipo } from "./Equipo";

@Entity()
export class Partido {
    @PrimaryGeneratedColumn()
    id_partido!: number;

    @Column({ type: "date" })
    fecha!: Date;

    @Column({ type: "varchar", length: 100 })
    resultado!: number;

    @ManyToOne(() => Estadio, (estadio) => estadio.partidos)
    @JoinColumn({ name: "id_estadio" })
    estadio!: Estadio;

    @Column({})
    id_estadio!: number;

    @ManyToOne(() => Equipo, (equipo) => equipo.partidos_locales)
    @JoinColumn({ name: "id_equipo_local" })
    equipo_local!: Equipo;

    @Column({})
    id_equipo_local!: number;

    @ManyToOne(() => Equipo, (equipo) => equipo.partidos_visitantes)
    @JoinColumn({ name: "id_equipo_visitante" })
    equipo_visitante!: Equipo;

    @Column({})
    id_equipo_visitante!: number;

}