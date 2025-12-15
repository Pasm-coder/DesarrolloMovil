import { Estadio } from "./Estadio";
export interface EstadioPort {
    createEstadio(estadio: Omit<Estadio, "id">): Promise<number>;
    getEstadioById(id: number): Promise<Estadio | null>;
    getAllEstadios(): Promise<Estadio[]>;
    updateEstadio(id: number, estadio: Partial<Estadio>): Promise<boolean>;
    deleteEstadio(id: number): Promise<boolean>;
    getEstadioByNombre(nombre: string): Promise<Estadio | null>;
}
