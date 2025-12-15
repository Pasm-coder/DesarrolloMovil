import { Ciudad } from "../domain/Ciudad";
import { CiudadPort } from "../domain/CiudadPort";

export class CiudadApplicationService {
    private port: CiudadPort;

    constructor(port: CiudadPort) {
        this.port = port;
    }

    async createCiudad(ciudad: Omit<Ciudad, "id">): Promise<number> {
        const existingCiudad = await this.port.getCiudadByNombre(ciudad.nombre);
        if (existingCiudad) {
            throw new Error("Ya existe una ciudad con este nombre");
        }
        return this.port.createCiudad(ciudad);
    }

    async getCiudadById(id: number): Promise<Ciudad | null> {
        return await this.port.getCiudadById(id);
    }

    async getCiudadByNombre(nombre: string): Promise<Ciudad | null> {
        return await this.port.getCiudadByNombre(nombre);
    }

    async getAllCiudades(): Promise<Ciudad[]> {
        return await this.port.getAllCiudades();
    }

    async updateCiudad(id: number, ciudad: Partial<Ciudad>): Promise<boolean> {
        const existingCiudad = await this.port.getCiudadById(id);
        if (!existingCiudad) {
            throw new Error("No se encontro la ciudad");
        }
        if (ciudad.nombre) {
            const nameTaken = await this.port.getCiudadByNombre(ciudad.nombre);
            if (nameTaken && nameTaken.id !== id) {
                throw new Error("El nombre de la ciudad ya esta");
            }
        }
        return await this.port.updateCiudad(id, ciudad);
    }

    async deleteCiudad(id: number): Promise<boolean> {
        const existingCiudad = await this.port.getCiudadById(id);
        if (!existingCiudad) {
            throw new Error("No se encontro la ciudad");
        }
        return await this.port.deleteCiudad(id);
    }
}

