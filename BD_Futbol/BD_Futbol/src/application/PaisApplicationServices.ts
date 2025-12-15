import { Pais } from "../domain/Pais";
import { PaisPort } from "../domain/PaisPort";


export class PaisApplicationService {
    private port: PaisPort;

    constructor(port: PaisPort) {
        this.port = port;
    }

    async createPais(pais: Omit<Pais, "id">): Promise<number> {
        const existingPais = await this.port.getPaisByNombre(pais.nombre);
        if (existingPais) {
        throw new Error("Ya existe el pais");
        }
        return this.port.createPais(pais);

    }


    async getPaisById(id: number): Promise<Pais | null> {
        return await this.port.getPaisById(id);
    }

    async getPaisByNombre(nombre: string): Promise<Pais | null> {
        return await this.port.getPaisByNombre(nombre);
    }
    async getAllPaises(): Promise<Pais[]> {
        return await this.port.getAllPaises();
    }
    async updatePais(id: number, pais: Partial<Pais>): Promise<boolean> {
        const existingPais = await this.port.getPaisById(id);
        if (!existingPais) {
            throw new Error("No se encontro el pais");
        }
        if (pais.nombre) {
            const nameTaken = await this.port.getPaisByNombre(pais.nombre);
            if (nameTaken && nameTaken.id !== id) {
                throw new Error("Ya existe el pais");
            }
        }
        return await this.port.updatePais(id, pais);
    }
    async deletePais(id: number): Promise<boolean> {
        const existingPais = await this.port.getPaisById(id);
        if (!existingPais) {
            throw new Error("No se encontro el pais");
        }
        return await this.port.deletePais(id);
    }
}