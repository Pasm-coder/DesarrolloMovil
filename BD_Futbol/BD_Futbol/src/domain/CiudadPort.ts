import { Ciudad } from "./Ciudad";

export interface CiudadPort {
    createCiudad(ciudad: Omit<Ciudad, "id">): Promise<number>;
    getCiudadById(id: number): Promise<Ciudad | null>;
    getCiudadByNombre(nombre: string): Promise<Ciudad | null>;
    getAllCiudades(): Promise<Ciudad[]>;
    updateCiudad(id: number, ciudad: Partial<Ciudad>): Promise<boolean>;
    deleteCiudad(id: number): Promise<boolean>;
}   
