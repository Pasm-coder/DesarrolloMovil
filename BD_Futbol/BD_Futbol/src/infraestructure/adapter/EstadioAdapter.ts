import { Repository } from "typeorm";
import { Estadio as EstadioDomain } from "../../domain/Estadio";
import { Estadio as EstadioEntity } from "../entities/Estadio";
import { EstadioPort } from "../../domain/EstadioPort";
import { AppDataSource } from "../config/data-base";

export class EstadioAdapter implements EstadioPort {
    private estadioRepository: Repository<EstadioEntity>;

    constructor() {
        this.estadioRepository = AppDataSource.getRepository(EstadioEntity);
    }

    private toDomain(estadio: EstadioEntity): EstadioDomain {
        return {
            id: estadio.id_estadio,
            nombre: estadio.nombre_estadio,
            capacidad: estadio.capacidad,
            ciudadId: estadio.id_ciudad,
        };
    }
    private toEntity(estadio: Omit<EstadioDomain, "id">): EstadioEntity {
        const estadioEntity = new EstadioEntity();
        estadioEntity.nombre_estadio = estadio.nombre;
        estadioEntity.capacidad = estadio.capacidad;
        estadioEntity.id_ciudad = estadio.ciudadId;
        return estadioEntity;
    }

    async createEstadio(estadio: Omit<EstadioDomain, "id">): Promise<number> {
        try{
            const newEstadio = this.toEntity(estadio);
            const savedEstadio = await this.estadioRepository.save(newEstadio);
            return savedEstadio.id_estadio;
        }catch (error) {
            console.error("Error creating estadio:", error);
            throw new Error("Error creating estadio");
        }
    }

    async getEstadioById(id: number): Promise<EstadioDomain | null> {
        try{
            const estadio = await this.estadioRepository.findOne({ where: { id_estadio: id } });
            return estadio ? this.toDomain(estadio) : null;
        }catch (error) {
            console.error("Error fetching estadio by ID:", error);
            throw new Error("Error fetching estadio by ID");
        }
    }

    async getAllEstadios(): Promise<EstadioDomain[]> {
        try {
            const estadios = await this.estadioRepository.find();
            return estadios.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all estadios:", error);
            throw new Error("Error fetching all estadios");
        }
    }

    async updateEstadio(id: number, estadio: Partial<EstadioDomain>): Promise<boolean> {
        try {
            const existingEstadio = await this.estadioRepository.findOne({ where: { id_estadio: id } });
            if (!existingEstadio) {
                throw new Error("Estadio not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingEstadio, {
                nombre_estadio: estadio.nombre ?? existingEstadio.nombre_estadio,
                capacidad: estadio.capacidad ?? existingEstadio.capacidad,
                id_ciudad: estadio.ciudadId ?? existingEstadio.id_ciudad
            });
            await this.estadioRepository.save(existingEstadio);
            return true;
        } catch (error) {
            console.error("Error updating estadio:", error);
            throw new Error("Error updating estadio");
        }
    }

    async deleteEstadio(id: number): Promise<boolean> {
        try {
            const existingEstadio = await this.estadioRepository.findOne({ where: { id_estadio: id } });
            if (!existingEstadio) {
                throw new Error("Estadio not found");
            }
            Object.assign(existingEstadio, {
                status_estadio: 0
            });
            await this.estadioRepository.save(existingEstadio);
            return true;
        } catch (error) {
            console.error("Error deleting estadio:", error);
            throw new Error("Error deleting estadio");
        }
    }

    async getEstadioByNombre(nombre: string): Promise<EstadioDomain | null> {
        try {
            const estadio = await this.estadioRepository.findOne({ where: { nombre_estadio: nombre } });
            return estadio ? this.toDomain(estadio) : null;
        } catch (error) {
            console.error("Error fetching estadio by nombre:", error);
            throw new Error("Error fetching estadio by nombre");
        }
    }
}
