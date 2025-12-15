import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { Pais } from "./Pais"; 
import { Estadio } from "./Estadio";

@Entity() 

export class Ciudad { 
    @PrimaryGeneratedColumn()
    id_ciudad!: number;

    @Column({ type: "varchar", length: 100 })
    nombre_ciudad!: string;

    @ManyToOne(() => Pais, (pais) => pais.ciudades)
    @JoinColumn({ name: "id_pais" })
    pais!: Pais;

    @Column({})
    id_pais!: number;

    @OneToMany(() => Estadio, (estadio) => estadio.ciudad)
    estadios!: Estadio[];

}
