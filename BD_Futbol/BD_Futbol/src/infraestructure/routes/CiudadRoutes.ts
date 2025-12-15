import { Router } from 'express'; 
import { CiudadAdapter } from '../adapter/CiudadAdapter';
import { CiudadApplicationService } from '../../application/CiudadApplicationServices';
import { CiudadController } from '../controller/CiudadController';

const router = Router();

//Inicializacion de las capas

const ciudadAdapter = new CiudadAdapter();
const ciudadAppService = new CiudadApplicationService(ciudadAdapter);
const ciudadController = new CiudadController(ciudadAppService);

//Definir ruta con manejo de errores

router.post('/ciudades', async (req, res) => {
  try {
    await ciudadController.createCiudad(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion de la ciudad', error });
  }
});

router.get('/ciudades', async (req, res) => {
  try {
    await ciudadController.getAllCiudades(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las ciudades', error });
  }
});

router.get('/ciudades/:id', async (req, res) => {
  try {
    await ciudadController.getCiudadById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la ciudad', error });
  }
});

router.get('/ciudades-nombre/:nombre', async (req, res) => {
  try {
    await ciudadController.getCiudadByNombre(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la ciudad por su nombre', error });
  }
});

router.put('/ciudades/:id', async (req, res) => {
  try {
    await ciudadController.updateCiudad(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la ciudad', error });
  }
});

router.delete('/ciudades/:id', async (req, res) => {
  try {
    await ciudadController.deleteCiudad(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la ciudad ', error });
  }
});

export default router;