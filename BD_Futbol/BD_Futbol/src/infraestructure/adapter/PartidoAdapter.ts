import { Repository } from "typeorm";
import { Partido as PartidoDomain } from "../../domain/Partido";
import { Partido as PartidoEntity } from "../entities/Partido";
import { PartidoPort } from "../../domain/PartidoPort";
import { AppDataSource } from "../config/data-base";

export class PartidoAdapter implements PartidoPort {
    private partidoRepository: Repository<PartidoEntity>;

    constructor() {
        this.partidoRepository = AppDataSource.getRepository(PartidoEntity);
    }

    private toDomain(partido: PartidoEntity): PartidoDomain {
        return {
            id: partido.id_partido,
            fecha: partido.fecha,
            estadioId: partido.id_estadio,
            equipoLocalId: partido.id_equipo_local,
            equipoVisitanteId: partido.id_equipo_visitante,
            resultado: partido.resultado,
        };
    }
    private toEntity(partido: Omit<PartidoDomain, "id">): PartidoEntity {
        const partidoEntity = new PartidoEntity();
        partidoEntity.fecha = partido.fecha;
        partidoEntity.id_estadio = partido.estadioId;
        partidoEntity.id_equipo_local = partido.equipoLocalId;
        partidoEntity.id_equipo_visitante = partido.equipoVisitanteId;
        partidoEntity.resultado = partido.resultado;
        return partidoEntity;
    }

    async createPartido(partido: Omit<PartidoDomain, "id">): Promise<number> {
        try{
            const newPartido = this.toEntity(partido);
            const savedPartido = await this.partidoRepository.save(newPartido);
            return savedPartido.id_partido;
        }catch (error) {
            console.error("Error creating partido:", error);
            throw new Error("Error creating partido");
        }
    }

    async getPartidoById(id: number): Promise<PartidoDomain | null> {
        try{
            const partido = await this.partidoRepository.findOne({ where: { id_partido: id } });
            return partido ? this.toDomain(partido) : null;
        }catch (error) {
            console.error("Error fetching partido by ID:", error);
            throw new Error("Error fetching partido by ID");
        }
    }

    async getAllPartidos(): Promise<PartidoDomain[]> {
        try {
            const partidos = await this.partidoRepository.find();
            return partidos.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all partidos:", error);
            throw new Error("Error fetching all partidos");
        }
    }

    async updatePartido(id: number, partido: Partial<PartidoDomain>): Promise<boolean> {
        try {
            const existingPartido = await this.partidoRepository.findOne({ where: { id_partido: id } });
            if (!existingPartido) {
                throw new Error("Partido not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingPartido, {
                fecha: partido.fecha ?? existingPartido.fecha,
                id_estadio: partido.estadioId ?? existingPartido.id_estadio,
                id_equipo_local: partido.equipoLocalId ?? existingPartido.id_equipo_local,
                id_equipo_visitante: partido.equipoVisitanteId ?? existingPartido.id_equipo_visitante,
                resultado: partido.resultado ?? existingPartido.resultado
            });
            await this.partidoRepository.save(existingPartido);
            return true;
        } catch (error) {
            console.error("Error updating partido:", error);
            throw new Error("Error updating partido");
        }
    }

    async deletePartido(id: number): Promise<boolean> {
        try {
            const existingPartido = await this.partidoRepository.findOne({ where: { id_partido: id } });
            if (!existingPartido) {
                throw new Error("Partido not found");
            }
            Object.assign(existingPartido, {
                status_partido: 0
            });
            await this.partidoRepository.save(existingPartido);
            return true;
        } catch (error) {
            console.error("Error deleting partido:", error);
            throw new Error("Error deleting partido");
        }
    }
}
