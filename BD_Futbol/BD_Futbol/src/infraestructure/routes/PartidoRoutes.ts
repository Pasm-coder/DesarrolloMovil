import { Router } from 'express'; 
import { PartidoAdapter } from '../adapter/PartidoAdapter';
import { PartidoApplicationService } from '../../application/PartidoApplicationServices';
import { PartidoController } from '../controller/PartidoController';

const router = Router();

//Inicializacion de las capas

const partidoAdapter = new PartidoAdapter();
const partidoAppService = new PartidoApplicationService(partidoAdapter);
const partidoController = new PartidoController(partidoAppService);

//Definir ruta con manejo de errores

router.post('/partido', async (req, res) => {
  try {
    await partidoController.createPartido(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion del partido', error });
  }
});

router.get('/partido', async (req, res) => {
  try {
    await partidoController.getAllPartidos(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los partidos', error });
  }
});

router.get('/partido/:id', async (req, res) => {
  try {
    await partidoController.getPartidoById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el partido', error });
  }
});

router.put('/partido/:id', async (req, res) => {
  try {
    await partidoController.updatePartido(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el partido', error });
  }
});

router.delete('/partido/:id', async (req, res) => {
  try {
    await partidoController.deletePartido(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar el partido', error });
  }
});
 
export default router;