import { Repository } from "typeorm";
import { Equipo as EquipoDomain } from "../../domain/Equipo";
import { Equipo as EquipoEntity } from "../entities/Equipo";
import { EquipoPort } from "../../domain/EquipoPort";
import { AppDataSource } from "../config/data-base";

export class EquipoAdapter implements EquipoPort {
    private equipoRepository: Repository<EquipoEntity>; 

    constructor() {
        this.equipoRepository = AppDataSource.getRepository(EquipoEntity);
    }

    private toDomain(equipo: EquipoEntity): EquipoDomain {
        return {
            id: equipo.id_equipo,
            nombre: equipo.nombre_equipo,
            paisId: equipo.id_pais,
        };
    }
    private toEntity(equipo: Omit<EquipoDomain, "id">): EquipoEntity {
        const equipoEntity = new EquipoEntity();
        equipoEntity.nombre_equipo = equipo.nombre;
        equipoEntity.id_pais = equipo.paisId;
        return equipoEntity;
    }

    async createEquipo(equipo: Omit<EquipoDomain, "id">): Promise<number> {
        try{
            const newEquipo = this.toEntity(equipo);
            const savedEquipo = await this.equipoRepository.save(newEquipo);
            return savedEquipo.id_equipo;
        }catch (error) {
            console.error("Error creating equipo:", error);
            throw new Error("Error creating equipo");
        }
    }

    async getEquipoById(id: number): Promise<EquipoDomain | null> {
        try{
            const equipo = await this.equipoRepository.findOne({ where: { id_equipo: id } });
            return equipo ? this.toDomain(equipo) : null;
        }catch (error) {
            console.error("Error fetching equipo by ID:", error);
            throw new Error("Error fetching equipo by ID");
        }
    }

    async getAllEquipos(): Promise<EquipoDomain[]> {
        try {
            const equipos = await this.equipoRepository.find();
            return equipos.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all equipos:", error);
            throw new Error("Error fetching all equipos");
        }
    }
    
    async updateEquipo(id: number, equipo: Partial<EquipoDomain>): Promise<boolean> {
        try {
            const existingEquipo = await this.equipoRepository.findOne({ where: { id_equipo: id } });
            if (!existingEquipo) {
                throw new Error("Equipo not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingEquipo, {
                nombre_equipo: equipo.nombre ?? existingEquipo.nombre_equipo,
                id_pais: equipo.paisId ?? existingEquipo.id_pais
            });
            await this.equipoRepository.save(existingEquipo);
            return true;
        } catch (error) {
            console.error("Error updating equipo:", error);
            throw new Error("Error updating equipo");
        }
    } 

    async deleteEquipo(id: number): Promise<boolean> {
        try {
            const existingEquipo = await this.equipoRepository.findOne({ where: { id_equipo: id } });
            if (!existingEquipo) {
                throw new Error("Equipo not found");
            }
            Object.assign(existingEquipo, {
                status_equipo: 0
            });
            await this.equipoRepository.save(existingEquipo);
            return true;
        } catch (error) {
            console.error("Error deleting equipo:", error);
            throw new Error("Error deleting equipo");
        }
    }

    async getEquipoByNombre(nombre: string): Promise<EquipoDomain | null> {
        try {
            const equipo = await this.equipoRepository.findOne({ where: { nombre_equipo: nombre } });
            return equipo ? this.toDomain(equipo) : null;
        } catch (error) {
            console.error("Error fetching equipo by nombre:", error);
            throw new Error("Error fetching equipo by nombre");
        }
    }
}
