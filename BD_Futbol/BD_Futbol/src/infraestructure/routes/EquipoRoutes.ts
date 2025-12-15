import { Router } from 'express'; 
import { EquipoAdapter } from '../adapter/EquipoAdapter';
import { EquipoApplicationService } from '../../application/EquipoApplicationServices';
import { EquipoController } from '../controller/EquipoController';

const router = Router();

//Inicializacion de las capas

const equipoAdapter = new EquipoAdapter();
const equipoAppService = new EquipoApplicationService(equipoAdapter);
const equipoController = new EquipoController(equipoAppService);

//Definir ruta con manejo de errores

router.post('/equipo', async (req, res) => {
  try {
    await equipoController.createEquipo(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion del equipo', error });
  }
});

router.get('/equipo', async (req, res) => {
  try {
    await equipoController.getAllEquipos(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los equipos', error });
  }
});

router.get('/equipo/:id', async (req, res) => {
  try {
    await equipoController.getEquipoById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el equipo', error });
  }
});

router.get('/equipo-nombre/:nombre', async (req, res) => {
  try {
    await equipoController.getEquipoByNombre(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el equipo por nombre', error });
  }
});

router.put('/equipo/:id', async (req, res) => {
  try {
    await equipoController.updateEquipo(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el equipo ', error });
  }
});

router.delete('/equipo/:id', async (req, res) => {
  try {
    await equipoController.deleteEquipo(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el equipo', error });
  }
});

export default router;