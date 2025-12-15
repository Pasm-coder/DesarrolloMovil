import { Partido } from "../domain/Partido";
import { PartidoPort } from "../domain/PartidoPort";


export class PartidoApplicationService {
    private port: PartidoPort;

    constructor(port: PartidoPort) {
        this.port = port;
    }

    async createPartido(partido: Omit<Partido, "id">): Promise<number> {
        try {
            return await this.port.createPartido(partido);
        } catch (error) {
            console.error("Ocurrio un error creando partido:", error);
            throw new Error("No se pudo crear el partido");
        }
    }

    async getPartidoById(id: number): Promise<Partido | null> {
        return await this.port.getPartidoById(id);
    }

    async getAllPartidos(): Promise<Partido[]> {
        return await this.port.getAllPartidos();
    }

    async updatePartido(id: number, partido: Partial<Partido>): Promise<boolean> {
        const existingPartido = await this.port.getPartidoById(id);
        if (!existingPartido) {
            throw new Error("No se encontro el partido");
        }
        if (partido.id) {
            const nombreTaken = await this.port.getPartidoById(partido.id);
            if (nombreTaken && nombreTaken.id !== id) {
                throw new Error("Partido ya existe");
            }
        }
        return await this.port.updatePartido(id, partido);
    }


    async deletePartido(id: number): Promise<boolean> {
        const existingPartido = await this.port.getPartidoById(id);
        if (!existingPartido) {
            throw new Error("No se encontro el partido");
        }
        return await this.port.deletePartido(id);
    }
}