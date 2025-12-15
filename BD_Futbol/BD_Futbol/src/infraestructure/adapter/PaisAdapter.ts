import { Repository } from "typeorm";
import { Pais as PaisDomain } from "../../domain/Pais";
import { Pais as PaisEntity } from "../entities/Pais";
import { PaisPort } from "../../domain/PaisPort";
import { AppDataSource } from "../config/data-base";

export class PaisAdapter implements PaisPort {
    private paisRepository: Repository<PaisEntity>;

    constructor() {
        this.paisRepository = AppDataSource.getRepository(PaisEntity);
    }

    private toDomain(pais: PaisEntity): PaisDomain {
        return {
            id: pais.id_pais,
            nombre: pais.nombre_pais,
        };
    }
    private toEntity(pais: Omit<PaisDomain, "id">): PaisEntity {
        const paisEntity = new PaisEntity();
        paisEntity.nombre_pais = pais.nombre;
        return paisEntity;
    }

    async createPais(pais: Omit<PaisDomain, "id">): Promise<number> {
        try{
            const newPais = this.toEntity(pais);
            const savedPais = await this.paisRepository.save(newPais);
            return savedPais.id_pais;
        }catch (error) {
            console.error("Error creating pais:", error);
            throw new Error("Error creating pais");
        }
    }

    async getPaisById(id: number): Promise<PaisDomain | null> {
        try{
            const pais = await this.paisRepository.findOne({ where: { id_pais: id } });
            return pais ? this.toDomain(pais) : null;
        }catch (error) {
            console.error("Error fetching pais by ID:", error);
            throw new Error("Error fetching pais by ID");
        }
    }

    async getAllPaises(): Promise<PaisDomain[]> {
        try {
            const paises = await this.paisRepository.find();
            return paises.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all paises:", error);
            throw new Error("Error fetching all paises");
        }
    }

    async updatePais(id: number, pais: Partial<PaisDomain>): Promise<boolean> {
        try {
            const existingPais = await this.paisRepository.findOne({ where: { id_pais: id } });
            if (!existingPais) {
                throw new Error("Pais not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingPais, {
                nombre_pais: pais.nombre || existingPais.nombre_pais,
            });
            await this.paisRepository.save(existingPais);
            return true;
        } catch (error) {
            console.error("Error updating pais:", error);
            throw new Error("Error updating pais");
        }
    }

    async deletePais(id: number): Promise<boolean> {
        try {
            const existingPais = await this.paisRepository.findOne({ where: { id_pais: id } });
            if (!existingPais) {
                throw new Error("Pais not found");
            }
            Object.assign(existingPais, {
                status_pais: 0
            });
            await this.paisRepository.save(existingPais);
            return true;
        } catch (error) {
            console.error("Error deleting pais:", error);
            throw new Error("Error deleting pais");
        }
    }

    async getPaisByNombre(nombre: string): Promise<PaisDomain | null> {
        try {
            const pais = await this.paisRepository.findOne({ where: { nombre_pais: nombre } });
            return pais ? this.toDomain(pais) : null;
        } catch (error) {
            console.error("Error fetching pais by nombre:", error);
            throw new Error("Error fetching pais by nombre");
        }
    }
}
