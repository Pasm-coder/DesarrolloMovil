import { PartidoApplicationService } from "../../application/PartidoApplicationServices";
import { Request, Response } from "express";
import { Partido } from "../../domain/Partido.js";

export class PartidoController {
    private app: PartidoApplicationService;

    constructor(app: PartidoApplicationService) {
        this.app = app;
    }
    async createPartido(req: Request, res: Response): Promise<Response> {
    try {
      const { fecha, estadioId, equipoLocalId, equipoVisitanteId, resultado } = req.body;

      if (!fecha || isNaN(Date.parse(fecha))) {
        return res.status(400).json({ error: "La fecha es requerida y debe ser una fecha válida." });
      }

      if (!estadioId || isNaN(estadioId)) {
        return res.status(400).json({ error: "El ID del estadio debe ser un número válido." });
      }

      if (!equipoLocalId || isNaN(equipoLocalId)) {
        return res.status(400).json({ error: "El ID del equipo local debe ser un número válido." });
      }

      if (!equipoVisitanteId || isNaN(equipoVisitanteId)) {
        return res.status(400).json({ error: "El ID del equipo visitante debe ser un número válido." });
      }

      const partido: Omit<Partido, "id"> = {
        fecha,
        estadioId: Number(estadioId),
        equipoLocalId: Number(equipoLocalId),
        equipoVisitanteId: Number(equipoVisitanteId),
        resultado,
      };

      const id = await this.app.createPartido(partido);

      return res.status(201).json({
        message: "Partido creado exitosamente",
        partidoId: id,
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

  async getPartidoById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
      const partido = await this.app.getPartidoById(id);
      if (!partido) return res.status(404).json({ error: "Partido no encontrado" });
      return res.status(200).json(partido);
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

    async getAllPartidos(req: Request, res: Response): Promise<Response> {
        try {
            const partidos = await this.app.getAllPartidos();
            return res.status(200).json(partidos);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    }

    async deletePartido(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deletePartido(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Partido no encontrado" });
                }
                return res.status(200).json({ message: "Partido dado de baja correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updatePartido(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { fecha, estadioId, equipoLocalId, equipoVisitanteId, resultado } = req.body;

      const update: Partial<Partido> = {};
      if (fecha) update.fecha = fecha;
      if (estadioId) update.estadioId = Number(estadioId);
      if (equipoLocalId) update.equipoLocalId = Number(equipoLocalId);
      if (equipoVisitanteId) update.equipoVisitanteId = Number(equipoVisitanteId);
      if (resultado) update.resultado = resultado;

      const updated = await this.app.updatePartido(id, update);

      if (!updated) {
        return res.status(404).json({ error: "Partido no encontrado o sin cambios" });
      }

      return res.status(200).json({ message: "Partido actualizado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el partido" });
    }
  }
}
