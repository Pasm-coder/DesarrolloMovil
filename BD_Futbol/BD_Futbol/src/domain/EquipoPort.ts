import {Equipo} from './Equipo';
export interface EquipoPort {
    getAllEquipos(): Promise<Equipo[]>;
    getEquipoById(id: number): Promise<Equipo | null>;
    getEquipoByNombre(nombre: string): Promise<Equipo | null>;
    createEquipo(equipo: Omit<Equipo, "id">): Promise<number>;
    updateEquipo(id: number, equipo: Partial<Equipo>): Promise<boolean>;
    deleteEquipo(id: number): Promise<boolean>;
}
