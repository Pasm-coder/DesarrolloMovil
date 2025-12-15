import { CiudadApplicationService } from "../../application/CiudadApplicationServices";
import { Request, Response } from "express";
import { Ciudad } from "../../domain/Ciudad.js";

export class CiudadController {
    private app: CiudadApplicationService;

    constructor(app: CiudadApplicationService) {
        this.app = app;
    }
    async createCiudad(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, paisId } = req.body;

      if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre de la ciudad es requerido y debe ser un string." });
      }

      if (!paisId || isNaN(paisId)) {
        return res.status(400).json({ error: "El ID del país debe ser un número válido." });
      }

      const ciudad: Omit<Ciudad, "id"> = {
        nombre: nombre.trim(),
        paisId: Number(paisId),
      };

      const id = await this.app.createCiudad(ciudad);

      return res.status(201).json({
        message: "Ciudad creada exitosamente",
        ciudadId: id,
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getCiudadById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
      const ciudad = await this.app.getCiudadById(id);
      if (!ciudad) return res.status(404).json({ error: "Ciudad no encontrada" });
      return res.status(200).json(ciudad);
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

    async getCiudadByNombre(req: Request, res: Response): Promise<Response>{
        try {
            const { nombre } = req.params;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre))
                return res.status(400).json({ error: "El nombre no es válido" });
            //Validacion de nombre exitosa procedemos a buscar la ciudad
            const ciudad = await this.app.getCiudadByNombre(nombre);
            if (!ciudad) return res.status(404).json({ error: "Ciudad no encontrada" });
            return res.status(200).json(ciudad);

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
    async getAllCiudades(req: Request, res: Response): Promise<Response> {
        try {
            const ciudades = await this.app.getAllCiudades();
            return res.status(200).json(ciudades);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener las ciudades" });
        }
    }

    async deleteCiudad(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deleteCiudad(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Ciudad no encontrada" });
                }
                return res.status(200).json({ message: "Ciudad eliminada correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updateCiudad(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { nombre, paisId } = req.body;

      const update: Partial<Ciudad> = {};
      if (nombre) update.nombre = nombre.trim();
      if (paisId) update.paisId = Number(paisId);

      const updated = await this.app.updateCiudad(id, update);

      if (!updated) {
        return res.status(404).json({ error: "Ciudad no encontrada o sin cambios" });
      }

      return res.status(200).json({ message: "Ciudad actualizada exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar la ciudad" });
    }
  }
}
