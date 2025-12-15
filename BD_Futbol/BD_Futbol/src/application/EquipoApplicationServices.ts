import { Equipo } from "../domain/Equipo";
import { EquipoPort } from "../domain/EquipoPort";

export class EquipoApplicationService {
    private port: EquipoPort;

    constructor(port: EquipoPort) {
        this.port = port;
    }
    async createEquipo(equipo: Omit<Equipo, "id">): Promise<number> {
        const existingEquipo = await this.port.getEquipoByNombre(equipo.nombre);
        if (existingEquipo) {
            throw new Error("Ya existe un equipo con este nombre");
        }
        return this.port.createEquipo(equipo);
    }


    async getEquipoById(id: number): Promise<Equipo | null> {
        return await this.port.getEquipoById(id);
    }

    async getEquipoByNombre(nombre: string): Promise<Equipo | null> {
        return await this.port.getEquipoByNombre(nombre);
    }

    async getAllEquipos(): Promise<Equipo[]> {
        return await this.port.getAllEquipos();
    }

    async updateEquipo(id: number, equipo: Partial<Equipo>): Promise<boolean> {
        const existingEquipo = await this.port.getEquipoById(id);
        if (!existingEquipo) {
            throw new Error("No se encontro el equipo");
        }
        if (equipo.nombre) {
            const nombreTaken = await this.port.getEquipoByNombre(equipo.nombre);
            if (nombreTaken && nombreTaken.id !== id) {
                throw new Error("El nombre del equipo ya existe");
            }
        }
        return await this.port.updateEquipo(id, equipo);
    }

    async deleteEquipo(id: number): Promise<boolean> {
        const existingEquipo = await this.port.getEquipoById(id);
        if (!existingEquipo) {
            throw new Error("No se encontro el equipo");
        }
        return await this.port.deleteEquipo(id);
    }
}