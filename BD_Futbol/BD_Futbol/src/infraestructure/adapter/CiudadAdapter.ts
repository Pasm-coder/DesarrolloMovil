import { Repository } from "typeorm";
import { Ciudad as CiudadDomain } from "../../domain/Ciudad";
import { Ciudad as CiudadEntity } from "../entities/Ciudad";
import { CiudadPort } from "../../domain/CiudadPort";
import { AppDataSource } from "../config/data-base";

export class CiudadAdapter implements CiudadPort {
    private ciudadRepository: Repository<CiudadEntity>;

    constructor() {
        this.ciudadRepository = AppDataSource.getRepository(CiudadEntity);
    }

    private toDomain(ciudad: CiudadEntity): CiudadDomain {
        return {
            id: ciudad.id_ciudad,
            nombre: ciudad.nombre_ciudad,
            paisId: ciudad.id_pais, 
        };
    }
    private toEntity(ciudad: Omit<CiudadDomain, "id">): CiudadEntity {
        const ciudadEntity = new CiudadEntity();
        ciudadEntity.nombre_ciudad = ciudad.nombre;
        ciudadEntity.id_pais = ciudad.paisId;
        return ciudadEntity;
    }

    async createCiudad(ciudad: Omit<CiudadDomain, "id">): Promise<number> {
        try{
            const newCiudad = this.toEntity(ciudad);
            const savedCiudad = await this.ciudadRepository.save(newCiudad);
            return savedCiudad.id_ciudad;
        }catch (error) {
            console.error("Error creating ciudad:", error);
            throw new Error("Error creating ciudad");
        }
    }

    async getCiudadById(id: number): Promise<CiudadDomain | null> {
        try{
            const ciudad = await this.ciudadRepository.findOne({ where: { id_ciudad: id } });
            return ciudad ? this.toDomain(ciudad) : null;
        }catch (error) {
            console.error("Error fetching ciudad by ID:", error);
            throw new Error("Error fetching ciudad by ID");
        }
    }

    async getAllCiudades(): Promise<CiudadDomain[]> {
        try {
            const ciudades = await this.ciudadRepository.find();
            return ciudades.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all ciudades:", error);
            throw new Error("Error fetching all ciudades");
        }
    }

    async updateCiudad(id: number, ciudad: Partial<CiudadDomain>): Promise<boolean> {
        try {
            const existingCiudad = await this.ciudadRepository.findOne({ where: { id_ciudad: id } });
            if (!existingCiudad) {
                throw new Error("Ciudad not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingCiudad, {
                nombre_ciudad: ciudad.nombre ?? existingCiudad.nombre_ciudad,
                id_pais: ciudad.paisId ?? existingCiudad.id_pais
            });
            await this.ciudadRepository.save(existingCiudad);
            return true;
        } catch (error) {
            console.error("Error updating ciudad:", error);
            throw new Error("Error updating ciudad");
        }
    }

    async deleteCiudad(id: number): Promise<boolean> {
        try {
            const existingCiudad = await this.ciudadRepository.findOne({ where: { id_ciudad: id } });
            if (!existingCiudad) {
                throw new Error("Ciudad not found");
            }
            Object.assign(existingCiudad, {
                status_ciudad: 0
            });
            await this.ciudadRepository.save(existingCiudad);
            return true;
        } catch (error) {
            console.error("Error deleting ciudad:", error);
            throw new Error("Error deleting ciudad");
        }
    }

    async getCiudadByNombre(nombre: string): Promise<CiudadDomain | null> {
        try {
            const ciudad = await this.ciudadRepository.findOne({ where: { nombre_ciudad: nombre } });
            return ciudad ? this.toDomain(ciudad) : null;
        } catch (error) {
            console.error("Error fetching ciudad by nombre:", error);
            throw new Error("Error fetching ciudad by nombre");
        }
    }
}
