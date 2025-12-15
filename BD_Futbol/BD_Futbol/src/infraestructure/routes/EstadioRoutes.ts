import { Router } from 'express'; 
import { EstadioAdapter } from '../adapter/EstadioAdapter';
import { EstadioApplicationService } from '../../application/EstadioApplicationServices';
import { EstadioController } from '../controller/EstadioController';

const router = Router();

//Inicializacion de las capas

const estadioAdapter = new EstadioAdapter();
const estadioAppService = new EstadioApplicationService(estadioAdapter);
const estadioController = new EstadioController(estadioAppService);

//Definir ruta con manejo de errores

router.post('/estadio', async (req, res) => {
  try {
    await estadioController.createEstadio(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion del estadio', error });
  }
});

router.get('/estadio', async (req, res) => {
  try {
    await estadioController.getAllEstadios(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los Estadios', error });
  }
});

router.get('/estadio/:id', async (req, res) => {
  try {
    await estadioController.getEstadioById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el estadio', error });
  }
});

router.get('/estadio-nombre/:nombre', async (req, res) => {
  try {
    await estadioController.getEstadioByNombre(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el estadio por nombre', error });
  }
});

router.put('/estadio/:id', async (req, res) => {
  try {
    await estadioController.updateEstadio(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el estadio', error });
  }
});

router.delete('/estadio/:id', async (req, res) => {
  try {
    await estadioController.deleteEstadio(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el estadio', error });
  }
});

export default router;
