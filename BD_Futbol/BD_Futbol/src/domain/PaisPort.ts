import {Pais} from './Pais';
export interface PaisPort {
  getAllPaises(): Promise<Pais[]>;
  getPaisById(id: number): Promise<Pais | null>;
  getPaisByNombre(nombre: string): Promise<Pais | null>;
  updatePais(id: number, pais: Partial<Pais>): Promise<boolean>;
  deletePais(id: number): Promise<boolean>;
  createPais(pais: Omit<Pais, 'id'>): Promise<number>;
}

