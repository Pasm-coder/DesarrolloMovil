import { EquipoApplicationService } from "../../application/EquipoApplicationServices.js";
import { Request, Response } from "express";
import { Equipo } from "../../domain/Equipo.js";

export class EquipoController {
    private app: EquipoApplicationService;

    constructor(app: EquipoApplicationService) {
        this.app = app;
    }
    async createEquipo(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, paisId } = req.body;

      if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del equipo es requerido y debe ser un string." });
      }

      if (!paisId || isNaN(paisId)) {
        return res.status(400).json({ error: "El ID del equipo debe ser un número válido." });
      }

      const equipo: Omit<Equipo, "id"> = {
        nombre: nombre.trim(),
        paisId: Number(paisId),
      };

      const id = await this.app.createEquipo(equipo);

      return res.status(201).json({
        message: "Equipo creado exitosamente",
        equipoId: id,
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

  async getEquipoById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
      const equipo = await this.app.getEquipoById(id);
      if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });
      return res.status(200).json(equipo);
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

    async getEquipoByNombre(req: Request, res: Response): Promise<Response>{
        try {
            const { nombre } = req.params;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre))
                return res.status(400).json({ error: "El nombre no es válido" });
            //Validacion de nombre exitosa procedemos a buscar la ciudad
            const equipo = await this.app.getEquipoByNombre(nombre);
            if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });
            return res.status(200).json(equipo);

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
    async getAllEquipos(req: Request, res: Response): Promise<Response> {
        try {
            const equipos = await this.app.getAllEquipos();
            return res.status(200).json(equipos);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los equipos" });
        }
    }

    async deleteEquipo(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deleteEquipo(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Equipo no encontrado" });
                }
                return res.status(200).json({ message: "Equipo dado de baja correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updateEquipo(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { nombre, paisId } = req.body;

      const update: Partial<Equipo> = {};
      if (nombre) update.nombre = nombre.trim();
      if (paisId) update.paisId = Number(paisId);

      const updated = await this.app.updateEquipo(id, update);

      if (!updated) {
        return res.status(404).json({ error: "Equipo no encontrado o sin cambios" });
      }

      return res.status(200).json({ message: "Equipo actualizado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el equipo" });
    }
  }
}
