import {Estadio} from '../domain/Estadio';
import {EstadioPort} from '../domain/EstadioPort';

export class EstadioApplicationService {
    private port: EstadioPort;

    constructor(port: EstadioPort) {
        this.port = port;
    }

    async createEstadio(estadio: Omit<Estadio, "id">): Promise<number> {
        const existingEstadio = await this.port.getEstadioByNombre(estadio.nombre);
        if (existingEstadio) {
            throw new Error("Ya existe un estadio con ese nombre");
        }
        return this.port.createEstadio(estadio);
    }
    

    async getEstadioById(id: number): Promise<Estadio | null> {
        return await this.port.getEstadioById(id);
    }

    async getEstadioByNombre(nombre: string): Promise<Estadio | null> {
        return await this.port.getEstadioByNombre(nombre);
    }

    async getAllEstadios(): Promise<Estadio[]> {
        return await this.port.getAllEstadios();
    }

    async updateEstadio(id: number, estadio: Partial<Estadio>): Promise<boolean> {
        const existingEstadio = await this.port.getEstadioById(id);
        if (!existingEstadio) {
            throw new Error("No se encontro el Estadio");
        }
        if (estadio.nombre) {
            const nameTaken = await this.port.getEstadioByNombre(estadio.nombre);
            if (nameTaken && nameTaken.id !== id) {
                throw new Error("Ya existe un estadio con ese nombre");
            }
        }
        return await this.port.updateEstadio(id, estadio);
    }

    async deleteEstadio(id: number): Promise<boolean> {
        const existingEstadio = await this.port.getEstadioById(id);
        if (!existingEstadio) {
            throw new Error("No se encontro el Estadio");
        }
        return await this.port.deleteEstadio(id);
    }
}