import { PaisApplicationService } from "../../application/PaisApplicationServices";
import { Request, Response } from "express";
import { Pais } from "../../domain/Pais.js";

export class PaisController {
    private app: PaisApplicationService;

    constructor(app: PaisApplicationService) {
        this.app = app;
    }
    async createPais(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre } = req.body;

            if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
                return res.status(400).json({ error: "El nombre no es válido" });
            }


            const pais: Omit<Pais, "id"> = { nombre };
            const newId = await this.app.createPais(pais);

            return res.status(201).json({ message: "País creado correctamente", id: newId });
        } catch (error) {
            return res.status(500).json({
                error: "Error al crear país",
                details: (error as Error).message
            });
        }
    }

  async getPaisById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
      const pais = await this.app.getPaisById(id);
      if (!pais) return res.status(404).json({ error: "País no encontrado" });
      return res.status(200).json(pais);
    } catch (error) {
      if (error instanceof Error) {
        return res
                .status(500)
                .json({ 
                    error: "Error interno del servidor", 
                    details: error.message, 
                });
            }
            return res.status(500).json({ error: "Error en el servidor" });

        }
    }

    async getPaisByNombre(req: Request, res: Response): Promise<Response>{
        try {
            const { nombre } = req.params;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre))
                return res.status(400).json({ error: "El nombre no es válido" });
            //Validacion de nombre exitosa procedemos a buscar la ciudad
            const pais = await this.app.getPaisByNombre(nombre);
            if (!pais) return res.status(404).json({ error: "País no encontrado" });
            return res.status(200).json(pais);

        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({ 
                    error: "Error interno del servidor", 
                    details: error.message, 
                });
            }
            return res.status(500).json({ error: "Error en el servidor" });

        }
    }
    async getAllPaises(req: Request, res: Response): Promise<Response> {
        try {
            const paises = await this.app.getAllPaises();
            return res.status(200).json(paises);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los países" });
        }
    }

    async deletePais(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deletePais(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Pais no encontrada" });
                }
                return res.status(200).json({ message: "Pais dado de baja correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updatePais(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { nombre } = req.body;

      const update: Partial<Pais> = {};
      if (nombre) update.nombre = nombre.trim();

      const updated = await this.app.updatePais(id, update);

      if (!updated) {
        return res.status(404).json({ error: "País no encontrado o sin cambios" });
      }

      return res.status(200).json({ message: "País actualizado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el país" });
    }
  }
}
