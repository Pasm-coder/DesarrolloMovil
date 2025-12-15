export interface Partido {
    id: number;
    fecha: Date;
    estadioId: number;
    equipoLocalId: number;
    equipoVisitanteId: number;
    resultado: number;
}