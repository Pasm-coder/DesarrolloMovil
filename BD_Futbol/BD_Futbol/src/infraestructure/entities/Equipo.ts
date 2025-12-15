import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pais } from "./Pais";
import { Partido } from "./Partido";

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn()
    id_equipo!: number;

    @Column({ type: "varchar", length: 100 })
    nombre_equipo!: string;

    @ManyToOne(() => Pais, (pais) => pais.equipos)
    @JoinColumn({ name: "id_pais" })
    pais!: Pais;

    @Column({})
    id_pais!: number;

    @OneToMany(() => Partido, (partido) => partido.equipo_local)
    partidos_locales!: Partido[];

    @OneToMany(() => Partido, (partido) => partido.equipo_visitante)
    partidos_visitantes!: Partido[];

}
