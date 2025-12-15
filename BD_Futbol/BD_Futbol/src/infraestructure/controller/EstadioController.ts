import { EstadioApplicationService } from "../../application/EstadioApplicationServices";
import { Request, Response } from "express";
import { Estadio } from "../../domain/Estadio.js";

export class EstadioController {
    private app: EstadioApplicationService;

    constructor(app: EstadioApplicationService) {
        this.app = app;
    }
    async createEstadio(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, capacidad, ciudadId } = req.body;

      if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre del estadio es requerido y debe ser un string." });
      }

      if (!capacidad || isNaN(capacidad)) {
        return res.status(400).json({ error: "La capacidad del estadio debe ser un número válido." });
      }

      if (!ciudadId || isNaN(ciudadId)) {
        return res.status(400).json({ error: "El ID del estadio debe ser un número válido." });
      }

      const estadio: Omit<Estadio, "id"> = {
        nombre: nombre.trim(),
        capacidad: Number(capacidad),
        ciudadId: Number(ciudadId),
      };

      const id = await this.app.createEstadio(estadio);

      return res.status(201).json({
        message: "Estadio creado exitosamente",
        estadioId: id,
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

  async getEstadioById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
      const estadio = await this.app.getEstadioById(id);
      if (!estadio) return res.status(404).json({ error: "Estadio no encontrado" });
      return res.status(200).json(estadio);
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

    async getEstadioByNombre(req: Request, res: Response): Promise<Response>{
        try {
            const { nombre } = req.params;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre))
                return res.status(400).json({ error: "El nombre no es válido" });
            //Validacion de nombre exitosa procedemos a buscar el estadio
            const estadio = await this.app.getEstadioByNombre(nombre);
            if (!estadio) return res.status(404).json({ error: "Estadio no encontrado" });
            return res.status(200).json(estadio);

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
    async getAllEstadios(req: Request, res: Response): Promise<Response> {
        try {
            const estadios = await this.app.getAllEstadios();
            return res.status(200).json(estadios);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los estadios" });
        }
    }

    async deleteEstadio(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deleteEstadio(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Estadio no encontrado" });
                }
                return res.status(200).json({ message: "Estadio dado de baja correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updateEstadio(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { nombre, capacidad, ciudadId } = req.body;

      const update: Partial<Estadio> = {};
      if (nombre) update.nombre = nombre.trim();
      if (capacidad) update.capacidad = Number(capacidad);
      if (ciudadId) update.ciudadId = Number(ciudadId);

      const updated = await this.app.updateEstadio(id, update);

      if (!updated) {
        return res.status(404).json({ error: "Estadio no encontrado o sin cambios" });
      }

      return res.status(200).json({ message: "Estadio actualizado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el estadio" });
    }
  }
}
