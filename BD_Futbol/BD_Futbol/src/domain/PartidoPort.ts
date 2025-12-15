import { Partido } from "./Partido";
export interface PartidoPort {
    createPartido(partido: Omit<Partido, "id">): Promise<number>;
    getPartidoById(id: number): Promise<Partido | null>;
    getAllPartidos(): Promise<Partido[]>;
    updatePartido(id: number, partido: Partial<Partido>): Promise<boolean>;
    deletePartido(id: number): Promise<boolean>;
}
